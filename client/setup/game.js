const playArea = document.querySelector('.play-area'),
    rollButton = document.querySelector('.roll'),
    resetButton = document.querySelector('.reset'),
    connectButton = document.querySelector('.connect'),
    rematchButton = document.querySelector('.rematch'),
    gameoverDisplay = document.querySelector('.gameover'),
    statusText = document.querySelector('.status')

let turn = 'p2'

let roll = 0

let rolled = false

let moved = false

let squares = []

let diceValues = []

let scores = {
    p1: 0,
    p2: 0
}

const board = new Board()

let dice = []

for (let i = 1; i <= 4; i++) {
    dice.push(new Dice(i))
}

const p1Pieces = []
for (let i = 0; i < 7; i++) {
    p1Pieces.push(new Piece('p1',i))
}

const p2Pieces = []
for (let i = 0; i < 7; i++) {
    p2Pieces.push(new Piece('p2',i))
}

const scorePiles = {
    p1: new ScorePile('p1'),
    p2: new ScorePile('p2')
}

rollButton.addEventListener('click', () => rollDice())
resetButton.addEventListener('click', () => {
    if (socket) {
        socket.disconnect()
        socket = null
    }
    reset()
    status('')
})
connectButton.addEventListener('click', () => {
    const ID = prompt("Enter your opponent's 5 character ID or leave blank to start a game.", '')
    if (ID !== null) connect(ID.toUpperCase())
})
rematchButton.addEventListener('click', () => {
    if (socket) rematch()
})

function switchTurn(reroll) {
    let bool = turn === 'p1'
    if (reroll) {
        bool = !bool
    }
    if (bool) {
        turn = 'p2'
        p2Pieces.forEach(piece => piece.elt.classList.add('turn'))
        p1Pieces.forEach(piece => piece.elt.classList.remove('turn'))
        rollButton.textContent = 'P2 Roll'
        board.p2Display.classList.add('show')
        board.p1Display.classList.remove('show')
    } else {
        turn = 'p1'
        p1Pieces.forEach(piece => piece.elt.classList.add('turn'))
        p2Pieces.forEach(piece => piece.elt.classList.remove('turn'))
        rollButton.textContent = 'P1 Roll'
        board.p2Display.classList.remove('show')
        board.p1Display.classList.add('show')
    }
    rolled = false
    moved = false
    if (socket) {
        if (turn === me) {
            status('Your Turn')
        } else {
            status("Opponent's Turn")
        }
    }
}
switchTurn()

function win(player) {
    let message
    if (socket) {
        if (me === player) {
            message = 'You Win!'
        } else {
            message = 'You Lost'
        }
    } else {
        message = player.toUpperCase() + ' wins!'
    }
    gameoverDisplay.querySelector('h2').textContent = message
    gameoverDisplay.classList.add('fly-in')
    opponentRematch = false
    if (socket) {
        rematchButton.classList.remove('hide')
    } else {
        rematchButton.classList.add('hide')
    }
}

function reset() {
    gameoverDisplay.classList.remove('fly-in')
    turn = 'p2'
    switchTurn()
    scores = {
        p1: 0,
        p2: 0
    }
    p1Pieces.forEach(piece => piece.reset())
    p2Pieces.forEach(piece => piece.reset())
    squares.forEach(square => square.reset())
    if (socket) {
        connectButton.classList.add('hide')
    } else {
        connectButton.classList.remove('hide')
    }
}

function status(text) {
    statusText.textContent = text
    statusText.style.display = 'block'
    statusText.classList.add('show')
    // setTimeout(() => {
    //     statusText.classList.remove('show')
    //     statusText.addEventListener('transitionend', function() {
    //         this.style.display = 'none'
    //     }, {once: true})
    // }, 5000)
}

function hideMove(e,remote) {
    squares.forEach(square => square.elt.classList.remove('select'))
    scorePiles.p1.elt.classList.remove('select')
    scorePiles.p2.elt.classList.remove('select')
    if (socket && !remote) {
        socket.emit('hide-move')
    }
}

function hasValidMoves() {
    let bool = false
    if (turn === 'p1') {
        p1Pieces.forEach(piece => {
            if (getSquare(turn,piece.square)) bool = true
        })
    } else {
        p2Pieces.forEach(piece => {
            if (getSquare(turn,piece.square)) bool = true
        })
    }
    hideMove('',true)
    return bool
}

function myTurn() {
    if (!socket || (me === turn)) return true
    return false
}

window.addEventListener('keyup', e => {
    if (e.key === ' ') rollDice()
})
