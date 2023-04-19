import { BigNumber } from "ethers";
import React from "react";
import { classnames } from "../consts";

export default class Board extends React.Component {
  render() {
    const { player, gameData, markSpaceForGame } = this.props;
    console.log(gameData);
    const { playerO, playerX, board, finished, winner } = gameData;

    // for grid: justify-content center?
    // for grid: explicitly set width of grid?
    return (
      <div className="flex flex-col items-center">
        <p>Finished: {finished ? "Yes" : "No"}</p>
        <p>
          Winner yet:{" "}
          {BigNumber.from(winner).toNumber() === 0 ? "None" : winner}
        </p>

        <p>Player X: {playerX}</p>
        <p>Player O: {playerO}</p>
        <p>Turn: {gameData.turns.toNumber() % 2 === 0 ? "X" : "O"}</p>
        <div className="aspect-square w-[480px]">
          <div className="grid grid-cols-3 grid-rows-3">
            {board.map((_, index) => {
              return (
                <Square
                  gameData={gameData}
                  index={index}
                  markSpaceForGame={markSpaceForGame}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    const { gameData, index, markSpaceForGame } = this.props;

    const boardValue = gameData.board[index];

    function getSquareValue() {
      if (boardValue.toNumber() === 0) {
        return "";
      } else if (boardValue.toNumber() === 1) {
        return "X";
      } else {
        return "O";
      }
    }

    function bordersForBox() {
      const borderWidth = "4";
      const borderProperties = "indigo-500";
      if (index === 0) {
        return `border-r-${borderWidth} border-b-${borderWidth} border-${borderProperties}`;
      }
      if (index === 1) {
        return `border-r-${borderWidth} border-b-${borderWidth}   border-l-${borderWidth} border-${borderProperties}`;
      }
      if (index === 2) {
        return `border-l-${borderWidth} border-b-${borderWidth} border-${borderProperties}`;
      }
      if (index === 3) {
        return `border-r-${borderWidth} border-b-${borderWidth}   border-t-${borderWidth} border-${borderProperties}`;
      }
      if (index === 4) {
        return `border-r-${borderWidth} border-b-${borderWidth}   border-l-${borderWidth} border-t-${borderWidth} border-${borderProperties}`;
      }
      if (index === 5) {
        return `border-b-${borderWidth} border-l-${borderWidth} border-t-${borderWidth} border-${borderProperties}`;
      }
      if (index === 6) {
        return `border-r-${borderWidth} border-l-${borderWidth} border-t-${borderWidth} border-${borderProperties}`;
      }
      if (index === 7) {
        return `border-r-${borderWidth} border-l-${borderWidth} border-t-${borderWidth} border-${borderProperties}`;
      }
      if (index === 8) {
        return `border-l-${borderWidth} border-t-${borderWidth} border-${borderProperties}`;
      }
    }

    return (
      <div
        className={classnames("bg-blue-400 h-40 w-40", bordersForBox())}
        onClick={() => markSpaceForGame(gameData.gameId.toString(), index)}
      >
        {getSquareValue()}
      </div>
    );
  }
}
