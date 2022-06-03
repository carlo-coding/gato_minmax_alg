



class Gato {

    constructor () {
        this.loadGameState()
        this.gameOver = false
        this.currPlayer = 1 //choose([1, -1])
        this.gatoActions = new GatoActions()
        this.machineActions = new AlphaBetaPlayer()

        this.gatoActions.clickListener((event)=> this.humanMoveListener(event))
    }

    move(r, c) {
        if (this.gameOver) return
        if (!this.gameState[r][c].playable) return
        this.gatoActions.makeMove(this.currPlayer, r, c)
        this.gameState[r][c].playable = false
        this.gameState[r][c].playedBy = this.currPlayer
        
        //this.moveChecker(r, c)
        if (isWinnerMove(this.gameState, this.currPlayer,r, c)) {
            this.gameOver = true
            window.alert((this.currPlayer==1)? "Ganaste !" : "La computadora gana !")
            return;
        }
        this.currPlayer *= -1
    }

    moveChecker(r, c) {
        console.log(`A move was made on: ${r} ${c}, by ${this.currPlayer}`)
        let moveValue = 0
        let moveValueOther = 0
        if (isWinnerMove(this.gameState, this.currPlayer, r, c)) {
            moveValue = Infinity * this.currPlayer
        }else if (isWinnerMove(this.gameState, this.currPlayer*-1, r, c)) {
            moveValueOther = Infinity * this.currPlayer * -1
        }
        console.log(`Value of move: ${moveValue}`)
        console.log(`Value of move for the other player: ${moveValueOther}`)

    }

    loadGameState() {
        this.gameState = []
        for (let i=0; i < 3; i++) {
            this.gameState.push([])
            for (let j=0; j < 3; j++) {
                let state = {
                    playable: true,
                    playedBy: null
                }
                this.gameState[i].push(state)
            }
        }
    }

    machineMove() {
        const mMove = this.machineActions.makeMove(this.gameState);
        if (mMove == undefined) return
        const [mrow, mcol] = mMove
        this.move(mrow, mcol)
    }

    humanMoveListener(event) {
        const { row, col } = this.gatoActions.findCuad(event.x, event.y)
        if ((row===null && col===null)) return;
        if (!this.gameState[row][col].playable) return
        this.move(row, col)
        this.machineMove()
    }

    start() {
        console.clear()
        this.loadGameState()
        this.gameOver = false
        this.gatoActions.clearBoard();
        this.currPlayer = choose([1, -1])
        this.gatoActions.drawBoard()
        if (this.currPlayer == -1) {
            this.machineMove()
        }
    }
}



const game = new Gato()
const restartButton = document.querySelector(".restart_game");

restartButton.addEventListener("click", ()=> {
    game.start()
})

game.start()