
function socketModule(io) {

    let connections = []

    io.on('connection', socket => {

        const id = ID.generate(),
            bundle = {socket, inGame: false, id, opponent: null}

        connections.push(bundle)

        socket.emit('connection', id)

        socket.on('challenge', opponentID => {
            const opponent = connections.find(c => {
                if (c.id === opponentID) return c
            })
            if (opponent && !opponent.inGame) {
                startGame(bundle, opponent)
            }
        })

        socket.on('disconnect', () => {
            const bundle = connections.find(c => {
                if (c.socket.id === socket.id) return c
            })
            if (bundle.opponent) {
                bundle.opponent.socket.emit('opponent-disconnect')
                bundle.opponent.opponent = null
                bundle.opponent.inGame = false
            }
            const i = connections.indexOf(bundle)
            connections.splice(i,1)
        })
    })
}

function startGame(p1, p2) {
    p1.opponent = p2
    p2.opponent = p1

    p1.inGame = true
    p2.inGame = true

    p1.socket.emit('start', 
        {me: 'p1', them: { player: 'p2', id: p2.id }}
    )
    p2.socket.emit('start', 
        {me: 'p2', them: { player: 'p1', id: p1.id }}
    )

    p1.socket.on('roll', vals => {
        rollRecieved(vals, p2)
    })
    p2.socket.on('roll', vals => {
        rollRecieved(vals, p1)
    })

    p1.socket.on('move', pieceIdx => {
        moveRecieved(pieceIdx, p2)
    })
    p2.socket.on('move', pieceIdx => {
        moveRecieved(pieceIdx, p1)
    })

    p1.socket.on('show-move', pieceIdx => {
        showMoveRecieved(pieceIdx, p2)
    })
    p2.socket.on('show-move', pieceIdx => {
        showMoveRecieved(pieceIdx, p1)
    })

    p1.socket.on('hide-move', () => {
        hideMoveRecieved(p2)
    })
    p2.socket.on('hide-move', pieceIdx => {
        hideMoveRecieved(p1)
    })

    p1.socket.on('rematch', () => rematch(p2))
    p2.socket.on('rematch', () => rematch(p1))

    p1.socket.on('accept-rematch', () => acceptRematch(p2))
    p2.socket.on('accept-rematch', () => acceptRematch(p1))

}

function rollRecieved(vals, reciever) {
    reciever.socket.emit('roll', vals)
}

function moveRecieved(pieceIdx, reciever) {
    reciever.socket.emit('move', pieceIdx)
}

function showMoveRecieved(pieceIdx, reciever) {
    reciever.socket.emit('show-move', pieceIdx)
}

function hideMoveRecieved(reciever) {
    reciever.socket.emit('hide-move')
}

function rematch(reciever) {
    reciever.socket.emit('rematch')
}

function acceptRematch(reciever) {
    reciever.socket.emit('accept-rematch')
}

const codeSeed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function ABCid() {
    const uids = {}
    
    this.generate = function(len=5) {
        let code
        do {
            code = ''
            for (var i = 0; i < len; i++) {
                code += codeSeed[randomInt(0,codeSeed.length-1)]
            }
        } while (uids[code])
        this.add(code)
        return code
    }

    this.add = function(ids) {
        uids[ids] = true
    }
}

const ID = new ABCid()

function randomInt(min=0, max=100) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = socketModule