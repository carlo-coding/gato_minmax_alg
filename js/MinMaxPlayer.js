

class Node {

    constructor (depth, player, gameState, move, value = 0) {
        this.depth = depth;
        this.player = player;
        this.gameState =  gameState 
        this.value = value
        this.children = []
        this.move = move
        this.createChildren()
    }

    createChildren() {
        if (this.depth >= 0) {
            const playableMoves = getPlayableMoves(this.gameState);
            this.playableMoves = playableMoves.length;
            for (let [row, col] of playableMoves) {
                let newGameState = JSON.parse(JSON.stringify(this.gameState))
                newGameState[row][col].playable = false
                newGameState[row][col].playedBy = this.player

                this.children.push(new Node(
                    this.depth - 1,
                    this.player * -1,
                    newGameState,
                    [row, col],
                    this.evalMove(newGameState, row, col),
                ))
            }
        }   
    }

    evalMove(gameState, r, c) {
        if (isWinnerMove(gameState, this.player, r, c)) {
            return Infinity * this.player
        }
        return 0;
    }

}


function MinMax(node, depth, player) {
    if ((depth == 0) || Math.abs(node.value) === Infinity) {
        return {val: node.value, move: node.move}
    }
    if (node.playableMoves === 0) return {val: node.value, move: node.move}
    
    if (player === 1) { // Maximizer
        let maxVal = -Infinity;
        for (let child of node.children) {
            let { val } = MinMax(child, depth - 1, player * -1)
            maxVal = Math.max(maxVal, val)
        }
        return {val: maxVal, move: node.move}
    }else { // Minimizer
        let minVal = Infinity;
        for (let child of node.children) {
            let { val } = MinMax(child, depth - 1, player * -1)
            minVal = Math.min(minVal, val)
        }
        return {val: minVal, move: node.move}
    }
}


class MinMaxPlayer {
    constructor(log_nodes=true) {
        this.log_nodes = log_nodes
    }

    makeMove(gameState) {
        const playableMoves = getPlayableMoves(gameState)
        // I initialize the best move to a random move 
        let bestMove = choose(playableMoves)

        // I want the first move to be random
        if (playableMoves.length === 9) return bestMove;

        let player = -1
        let depth = 10
        const node = new Node(depth, player, gameState)
        let minVal = Infinity;

        if(this.log_nodes) console.log("----------")
        for (let i = 0; i < node.children.length; i++) {
            let { val, move} = MinMax(node.children[i], depth-1, player *-1)
            if(this.log_nodes) console.log(`Val for node ${i+1}: ${val}`)
            if (val < minVal) {
                minVal = val
                bestMove = move
            }
        }

        return bestMove;
    }
}