

function AlphaBetaPruning(node, depth, player, alpha, beta) {
    if ((depth == 0) || Math.abs(node.value) === Infinity) {
        return {val: node.value, move: node.move}
    }
    if (node.playableMoves === 0) return {val: node.value, move: node.move}
    
    if (player === 1) { // Maximizer
        let maxVal = -Infinity;
        for (let child of node.children) {
            let { val } = MinMax(child, depth - 1, player * -1, alpha, beta)
            maxVal = Math.max(maxVal, val)
            alpha = Math.max(alpha, val)
            if (beta <= alpha){ 
                break
            }
        }
        return {val: maxVal, move: node.move}
    }else { // Minimizer
        let minVal = Infinity;
        for (let child of node.children) {
            let { val } = MinMax(child, depth - 1, player * -1, alpha, beta)
            minVal = Math.min(minVal, val)
            beta = Math.min(beta, val) 
            if (beta <= alpha) {
                break
            }
        }
        return {val: minVal, move: node.move}
    }
}


class AlphaBetaPlayer {
    constructor(log_nodes=true) {
        this.log_nodes = log_nodes
    }

    makeMove(gameState) {
        const playableMoves = getPlayableMoves(gameState)
        // I initialize the best move to a random move 
        let bestMove = choose(playableMoves)

        // I want the first move to be random
        if (playableMoves.length === 9) {
            return bestMove;
        }

        let player = -1
        let depth = 19
        const node = new Node(depth, player, gameState)
        let minVal = Infinity;

        if(this.log_nodes) console.log("----------")
        for (let i = 0; i < node.children.length; i++) {
            let { val, move} = AlphaBetaPruning(node.children[i], depth-1, player *-1, -Infinity, Infinity)
            if(this.log_nodes) console.log(`Val for node ${i+1}: ${val}`)
            if (val < minVal) {
                minVal = val
                bestMove = move
            }
        }

        return bestMove;
    }
}