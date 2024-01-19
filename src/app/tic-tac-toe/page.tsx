'use client';

import { useState, useEffect } from 'react';

interface IWinningCombo {
  indexes: Array<number>;
  orientation: string;
}

const initialGameData: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const winningCombinations = [
  {
    indexes: [0, 1, 2],
    orientation: 'tic-tac-toe-winner tic-tac-toe-horizontal',
  },
  {
    indexes: [3, 4, 5],
    orientation: 'tic-tac-toe-winner tic-tac-toe-horizontal',
  },
  {
    indexes: [6, 7, 8],
    orientation: 'tic-tac-toe-winner tic-tac-toe-horizontal',
  },
  {
    indexes: [0, 3, 6],
    orientation: 'tic-tac-toe-winner tic-tac-toe-vertical',
  },
  {
    indexes: [1, 4, 7],
    orientation: 'tic-tac-toe-winner tic-tac-toe-vertical',
  },
  {
    indexes: [2, 5, 8],
    orientation: 'tic-tac-toe-winner tic-tac-toe-vertical',
  },
  {
    indexes: [0, 4, 8],
    orientation: 'tic-tac-toe-winner tic-tac-toe-diagonal-1',
  },
  {
    indexes: [2, 4, 6],
    orientation: 'tic-tac-toe-winner tic-tac-toe-diagonal-2',
  },
];

export default function TicTacToe() {
  const [gameData, setGameData] = useState(initialGameData);
  const [turn, setTurn] = useState(1);
  const [winningCombo, setWinningCombo] = useState<IWinningCombo | null>(null);

  const handleClick = (clickedIndex: number) => {
    if (gameData[clickedIndex] !== 0) return;
    if (winningCombo) return;

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[clickedIndex] = turn;

      return newGameData;
    });

    setTurn((prev) => (prev === 1 ? 2 : 1));
  };

  useEffect(() => {
    checkWinner();
    checkGameEnded();
  }, [gameData]);

  const checkWinner = () => {
    let winner = null;

    for (let combination of winningCombinations) {
      const { indexes } = combination;
      if (
        gameData[indexes[0]] === 1 &&
        gameData[indexes[1]] === 1 &&
        gameData[indexes[2]] === 1
      ) {
        winner = 'player1';
      }

      if (
        gameData[indexes[0]] === 2 &&
        gameData[indexes[1]] === 2 &&
        gameData[indexes[2]] === 2
      ) {
        winner = 'player2';
      }

      if (winner) {
        setWinningCombo(combination);
        break;
      }
    }
  };

  const checkGameEnded = () => {
    const isGameDraw = gameData.every((item) => item !== 0);
    if (isGameDraw) {
      setTimeout(() => {
        alert('o jogo acabou, deu velha!');
      });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="grid grid-cols-3 m-8 max-w-3xl overflow-hidden">
        {gameData.map((value, index) => (
          <span
            key={index}
            onClick={() => handleClick(index)}
            className={`flex items-center justify-center w-28 h-28 border border-gray-100 text-xl hover:bg-zinc-900 cursor-pointer relative ${
              winningCombo?.indexes.includes(index)
                ? winningCombo.orientation
                : null
            }`}
          >
            {value === 1 && '❌'}
            {value === 2 && '⭕'}
          </span>
        ))}
      </div>
    </div>
  );
}
