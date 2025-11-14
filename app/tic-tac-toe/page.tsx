'use client';

import React, { useState } from 'react';
import Square from './Square';
import styles from './TicTacToe.module.css';
import { SquareValue } from './types';


// Helper function to check for a winner
function calculateWinner(squares: SquareValue[]): SquareValue | 'Draw' | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],           // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  // Check for a draw (all squares filled, but no winner)
  if (squares.every(Boolean)) {
    return 'Draw';
  }

  return null;
}

export default function TicTacToeGame(): JSX.Element {
  // Initialize state: the board array and whose turn it is
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  // Handle a click on a square
  const handleClick = (i: number): void => {
    const winnerStatus = calculateWinner(squares);

    // Ignore click if the square is already filled or the game is over
    if (squares[i] || winnerStatus) {
      return;
    }

    // Create a new board state for immutability
    const nextSquares: SquareValue[] = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    // Update state
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  // Determine and display game status
  const winnerStatus = calculateWinner(squares);
  let status: string;

  if (winnerStatus === 'Draw') {
      status = 'Result: Draw!';
  } else if (winnerStatus) {
      status = `Winner: ${winnerStatus}`;
  } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  // Renders the 3x3 board structure
  const renderBoard = () => {
    // Defines the starting index for each row (0, 3, 6)
    const rowStarts = [0, 3, 6]; 
    return (
      <div className={styles.board}>
        {rowStarts.map((start) => (
          <div key={start} className={styles['board-row']}>
            {/* Renders the three squares for the current row */}
            {Array(3).fill(null).map((_, index) => {
                const i = start + index; // Calculate the specific square index (0 to 8)
                return (
                    <Square 
                        key={i}
                        value={squares[i]}
                        onSquareClick={() => handleClick(i)}
                    />
                );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.game}>
      <h1 className={styles.header}>React Tic-Tac-Toe (X-O)</h1>
      <div className={styles.status}>{status}</div>
      {renderBoard()}
      <button 
        className={styles.resetButton}
        onClick={() => { setSquares(Array(9).fill(null)); setXIsNext(true); }}
      >
        Start New Game
      </button>
    </div>
  );
}