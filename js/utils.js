function isWinnerMove(gameState, currPlayer, r, c) {
    // check if row is a winner row
    let winner = true
    for (let i = 0; i < 3; i++) {
        winner = winner && (gameState[i][c].playedBy == currPlayer)
    }
    if (winner) return winner

    // check if a column is a winner column
    winner = true
    for (let j = 0; j < 3; j++) {
        winner = winner && (gameState[r][j].playedBy == currPlayer)
    }
    if (winner) return winner

    // check if is a winner diagonal 
    winner = true
    for (let j = 0; j < 3; j++) {
        winner = winner && (gameState[j][j].playedBy == currPlayer)
    }
    if (winner) return winner

    winner = true
    for (let i = 0; i < 3; i++) {
        winner = winner && (gameState[i][Math.abs(i-2)].playedBy == currPlayer)
    }
    if (winner) return winner
}


function getPlayableMoves(gameState) {
    const playableMoves = []
    for (let i=0; i < 3; i++) {
        for (let j=0; j < 3; j++) {
            const { playable } = gameState[i][j]
            if (playable) playableMoves.push([i, j])
        }
    } 
    return playableMoves
}

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}