let socket
let me
let opponentRematch

function connect(opponent) {

    let ID

    socket = io()
    socket.on('connection', id => {
        status(`Connected! ID: ${id}`)
        ID = id
    })
    socket.emit('challenge', opponent)
    
    socket.on('start', res => {
        me = res.me
        reset()
        if (me === 'p2') {
            status("Game Started: Opponent's Turn")
        } else {
            status("Game Started: Your Turn")
        }
    })

    socket.on('roll', vals => {
        rollDice(vals)
    })

    socket.on('move', pieceIdx => {
        if (me === 'p2') {
            p1Pieces[pieceIdx].move('',true)
        } else {
            p2Pieces[pieceIdx].move('',true)
        }
    })

    socket.on('show-move', pieceIdx => {
        if (me === 'p2') {
            p1Pieces[pieceIdx].showMove('',true)
        } else {
            p2Pieces[pieceIdx].showMove('',true)
        }
    })

    socket.on('hide-move', () => hideMove('',true))

    socket.on('rematch', () => {
        opponentRematch = true
        status('Your opponent wants a rematch.')
    })

    socket.on('accept-rematch', () => {
        opponentRematch = true
        rematch(true)
    })

    socket.on('opponent-disconnect', () => {
        status('Your opponent has disconnected.')
        if (socket) {
            socket.disconnect()
            socket = null
        }
        reset()
    })
}

function rematch(remote) {
    if (opponentRematch) {
        reset()
        if (me === 'p2') {
            me = 'p1'
            status("Game Started: Your Turn")
        } else {
            me = 'p2'
            status("Game Started: Opponent's Turn")
        }
        if (!remote) socket.emit('accept-rematch')
    } else {
        socket.emit('rematch')
    }
}