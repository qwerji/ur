function Board() {
    this.p1start = null
    this.p2start = null

    this.elt = document.createElement('div')
    this.elt.classList.add('board')

    constructLL.bind(this)()

    playArea.appendChild(this.elt)
}