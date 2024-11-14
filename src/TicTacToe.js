import React, { useState } from 'react';
import './tictactoe.css';

function TicTacToe() {
  
  const [board, setBoard] = useState(Array(9).fill(null));
  
  const [turn, setTurn] = useState("X");

  
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  }
 
  const handleClick = (index) => {
   
    if (board[index] || checkWinner()) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  
  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; 
      }
    }
    return null; 
  };

  const checkTie = () => {
    return board.every(square => square!== null) && !checkWinner();
  }
  
  const winner = checkWinner();
  const tie = checkTie();


  return (
    <div className="container">
      <h1>{winner ? `Winner: ${winner}` : `Next turn: ${turn}`}</h1>
      <div className="board">
        {board.map((square, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <button className= "resetButton" onClick={() => restartGame()}>Restart</button>
    </div>
  );
}

export default TicTacToe;
