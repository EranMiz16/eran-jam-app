import React from 'react';
import styles from './TicTacToe.module.css';
import { SquareValue } from './types';

// Define the required props for the Square component
interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
}

export default function Square({ value, onSquareClick }: SquareProps): JSX.Element {
  return (
    <button className={styles.square} onClick={onSquareClick}>
      {value}
    </button>
  );
}