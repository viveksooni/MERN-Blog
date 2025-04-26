import React, { useState, useCallback, memo } from "react";
import { Button } from "../ui/button";

const calculateWinner = (board) => {
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (a !== -1 && a === b && b === c) {
      return a;
    }
  }

  return null;
};

const Square = memo(({ value, onClick, disabled }) => {
  const displayValue = value === -1 ? "" : value;
  return (
    <div
      className="aspect-square h-20 w-20 flex justify-center items-center  border-2 font-bold text-3xl border-white cursor-pointer hover:bg-gray-800 transition-colors"
      onClick={onClick}
      aria-disabled={disabled}
    >
      {displayValue}
    </div>
  );
});

export default function CrossAndZero() {
  const initialBoard = () =>
    Array(3)
      .fill()
      .map(() => Array(3).fill(-1));

  const [matrix, setMatrix] = useState(initialBoard());
  const [zeroTurn, setZeroTurn] = useState(false);
  const [winner, setWinner] = useState(null);

  const checkGameEnd = (board) => {
    const win = calculateWinner(board);
    if (win) return win;
    if (board.every((row) => row.every((cell) => cell !== -1))) return "draw";
    return null;
  };

  const handleSquareClick = useCallback(
    (row, col) => {
      if (matrix[row][col] !== -1 || winner) return;

      const newBoard = matrix.map((row) => [...row]);
      newBoard[row][col] = zeroTurn ? "O" : "X";

      const gameStatus = checkGameEnd(newBoard);
      if (gameStatus) {
        setWinner(gameStatus);
      } else {
        setZeroTurn((prev) => !prev);
      }
      setMatrix(newBoard);
    },
    [matrix, zeroTurn, winner]
  );

  const handleReset = () => {
    setMatrix(initialBoard());
    setZeroTurn(false);
    setWinner(null);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <h1 className="text-3xl">Tic Tac Toe</h1>

      <div className="grid grid-cols-3 gap-0 mb-5 relative">
        {matrix.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Square
              key={`${rowIdx}-${colIdx}`}
              value={cell}
              onClick={() => handleSquareClick(rowIdx, colIdx)}
              disabled={!!winner}
            />
          ))
        )}
        <div
          className={`${
            !winner ? "hidden" : "backdrop-blur-sm w-full h-full"
          } absolute text-3xl scale-150 flex justify-center items-center text-center font-bold`}
        >
          <div>
            {winner ? (
              winner === "draw" ? (
                <h2>Game is a draw!</h2>
              ) : (
                <h2>"{winner}" has won the Game</h2>
              )
            ) : (
              <h2>Next Turn: {zeroTurn ? "O" : "X"}</h2>
            )}
          </div>
        </div>
      </div>

      <Button className="mb-10 z-10" onClick={handleReset}>
        Reset Game
      </Button>
    </div>
  );
}
