import { globals, status, reset, hideMove, p1Pieces, p2Pieces } from './game.js'
import { rollDice } from './../entities/Dice.js'

function connect(opponent) {
    globals.socket = io()
    const socket = globals.socket

    let ID

    socket.on('connection', id => {
        status(`Connected! ID: ${id}`)
        ID = id
    })
    socket.emit('challenge', opponent)
    
    socket.on('start', res => {
        globals.me = res.me
        reset()
        if (globals.me === 'p2') {
            status("Game Started: Opponent's Turn")
        } else {
            status("Game Started: Your Turn")
        }
    })

    socket.on('roll', vals => {
        rollDice(vals)
    })

    socket.on('move', pieceIdx => {
        if (globals.me === 'p2') {
            p1Pieces[pieceIdx].move('',true)
        } else {
            p2Pieces[pieceIdx].move('',true)
        }
    })

    socket.on('show-move', pieceIdx => {
        if (globals.me === 'p2') {
            p1Pieces[pieceIdx].showMove('',true)
        } else {
            p2Pieces[pieceIdx].showMove('',true)
        }
    })

    socket.on('hide-move', () => hideMove('',true))

    socket.on('rematch', () => {
        globals.opponentRematch = true
        status('Your opponent wants a rematch.')
    })

    socket.on('accept-rematch', () => {
        globals.opponentRematch = true
        rematch(true)
    })

    socket.on('opponent-disconnect', () => {
        status('Your opponent has disconnected.')
        if (socket) {
            socket.disconnect()
            globals.socket = null
        }
        reset()
    })
}

function rematch(remote) {
    if (globals.opponentRematch) {
        reset()
        if (globals.me === 'p2') {
            globals.me = 'p1'
            status("Game Started: Your Turn")
        } else {
            globals.me = 'p2'
            status("Game Started: Opponent's Turn")
        }
        if (!remote) socket.emit('accept-rematch')
    } else {
        socket.emit('rematch')
    }
}

export { connect }