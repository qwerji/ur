// CSS
import './../styles/main.css'
import './../styles/animations.css'

// JS
import { Board } from './../entities/Board.js'
import { Dice, rollDice } from './../entities/Dice.js'
import { Piece } from './../entities/Piece.js'
import { ScorePile } from './../entities/ScorePile.js'
import { getSquare } from './getSquare.js'
import { connect } from './socket.js'

// Code
const playArea = document.querySelector('.play-area'),
    rollButton = document.querySelector('.roll'),
    resetButton = document.querySelector('.reset'),
    connectButton = document.querySelector('.connect'),
    rematchButton = document.querySelector('.rematch'),
    gameoverDisplay = document.querySelector('.gameover'),
    statusText = document.querySelector('.status')

const globals = {
    turn: 'p2',
    roll: 0,
    rolled: false,
    moved: false,
    opponentRematch: false,
    switched: false,
    diceValues: [],
    me: null,
    socket: null
}

let squares = []

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
    if (globals.socket) {
        globals.socket.disconnect()
        globals.socket = null
    }
    reset()
    status('')
})
connectButton.addEventListener('click', () => {
    const ID = prompt("Enter your opponent's 5 character ID or leave blank to start a game.", '')
    if (ID !== null) connect(ID.toUpperCase())
})
rematchButton.addEventListener('click', () => {
    if (globals.socket) rematch()
})

function switchTurn(reroll) {
    let bool = globals.turn === 'p1'
    if (reroll) {
        bool = !bool
    }
    if (bool) {
        globals.turn = 'p2'
        p2Pieces.forEach(piece => piece.elt.classList.add('turn'))
        p1Pieces.forEach(piece => piece.elt.classList.remove('turn'))
        rollButton.textContent = 'P2 Roll'
        board.p2Display.classList.add('show')
        board.p1Display.classList.remove('show')
    } else {
        globals.turn = 'p1'
        p1Pieces.forEach(piece => piece.elt.classList.add('turn'))
        p2Pieces.forEach(piece => piece.elt.classList.remove('turn'))
        rollButton.textContent = 'P1 Roll'
        board.p2Display.classList.remove('show')
        board.p1Display.classList.add('show')
    }
    globals.rolled = false
    globals.moved = false
    if (globals.socket) {
        if (globals.turn === globals.me) {
            status('Your Turn')
        } else {
            status("Opponent's Turn")
        }
    }
}
switchTurn()

function win(player) {
    let message
    if (globals.socket) {
        if (globals.me === player) {
            message = 'You Win!'
        } else {
            message = 'You Lost'
        }
    } else {
        message = player.toUpperCase() + ' wins!'
    }
    gameoverDisplay.querySelector('h2').textContent = message
    gameoverDisplay.classList.add('fly-in')
    globals.opponentRematch = false
    if (globals.socket) {
        rematchButton.classList.remove('hide')
    } else {
        rematchButton.classList.add('hide')
    }
}

function reset() {
    gameoverDisplay.classList.remove('fly-in')
    globals.turn = 'p2'
    switchTurn()
    scores = {
        p1: 0,
        p2: 0
    }
    p1Pieces.forEach(piece => piece.reset())
    p2Pieces.forEach(piece => piece.reset())
    squares.forEach(square => square.reset())
    if (globals.socket) {
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
    if (globals.socket && !remote) {
        globals.socket.emit('hide-move')
    }
}

function hasValidMoves() {
    let bool = false
    if (globals.turn === 'p1') {
        p1Pieces.forEach(piece => {
            if (getSquare(globals.turn,piece.square)) bool = true
        })
    } else {
        p2Pieces.forEach(piece => {
            if (getSquare(globals.turn,piece.square)) bool = true
        })
    }
    hideMove('',true)
    return bool
}

function myTurn() {
    if (!globals.socket || (globals.me === globals.turn)) return true
    return false
}

window.addEventListener('keyup', e => {
    if (e.key === ' ') rollDice()
})

export { globals, squares, diceValues, scores, board, dice, p1Pieces, p2Pieces, playArea, hideMove, myTurn, hasValidMoves, scorePiles, rollButton, switchTurn, status, reset, win }