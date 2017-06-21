const playArea = document.querySelector('.play-area'),
    rollButton = document.querySelector('.roll')

let turn = 'p2'

let roll = 0

let rolled = false

let squares = []

let scores = {
    p1: 0,
    p2: 0
}

const board = new Board()

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

rollButton.addEventListener('click', function() {
    if (rolled) return
    rolled = true
    roll = H.randomInt(0,1) + H.randomInt(0,1) + H.randomInt(0,1) + H.randomInt(0,1)
    this.textContent = roll
    if (roll === 0) {
        setTimeout(switchTurn,1500)
    }
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
    } else {
        turn = 'p1'
        p1Pieces.forEach(piece => piece.elt.classList.add('turn'))
        p2Pieces.forEach(piece => piece.elt.classList.remove('turn'))
        rollButton.textContent = 'P1 Roll'
    }
    rolled = false
}
switchTurn()

function win(player) {
    console.log(player + ' wins!')
}

function reset() {
    turn = 'p2'
    switchTurn()
    scores = {
        p1: 0,
        p2: 0
    }
    p1Pieces.forEach(piece => piece.reset())
    p2Pieces.forEach(piece => piece.reset())
    squares.forEach(square => square.reset())
}