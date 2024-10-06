import './index.css';
import React, { useState } from 'react';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [isXNext, setIsXNext] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board)) return;

        const newBoard = board.slice();
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);

    const restartGame = (startingPlayer) => {
        setBoard(Array(9).fill(""));
        setIsXNext(startingPlayer === "X");
        setGameStarted(true);
    };

    const clearBoard = () => {
        setBoard(Array(9).fill(""));
        setIsXNext(true);
        setGameStarted(false);
    };

    return (
        <div id='box'>
            <h1>Tic-Tac-Toe Game</h1>
            {!gameStarted ? (
                <div>
                    <h2>Select Starting Player:</h2>
                    <button onClick={() => restartGame("X")}>Player 1 (X)</button>
                    <button onClick={() => restartGame("O")}>Player 2 (O)</button>
                </div>
            ) : (
                <>
                    <table>
                        <tbody>
                            {[0, 1, 2].map(row => (
                                <tr key={row}>
                                    {[0, 1, 2].map(col => {
                                        const index = row * 3 + col;
                                        return (
                                            <td key={col}>
                                                <button onClick={() => handleClick(index)} className='but'>
                                                    {board[index]}
                                                </button>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div id='result'>
                        {winner ? <h2>Congratulations! {winner} Wins!</h2> : board.every(Boolean) ? <h2>It's a Tie!</h2> : <h2>Next turn: {isXNext ? "X" : "O"}</h2>}
                    </div>
                    <button onClick={clearBoard}>Clear Board</button>
                </>
            )}
        </div>
    );
};

export default Game;
