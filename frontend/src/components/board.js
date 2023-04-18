import React from "react";

export default class Board extends React.Component {
  render() {
    const { player, gameData, markSpaceForGame } = this.props;
    console.log(gameData);
    const { playerX, playerY, board, finished, winner } = gameData;

    return (
      <div>
        <p>Turn</p>
        <p>Blah</p>
        <div className="grid grid-cols-3 grid-rows-3 gap-0">
          {board.map((square, index) => {
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
    );
  }
}

class Square extends React.Component {
  render() {
    const { gameData, index, markSpaceForGame } = this.props;

    const boardValue = gameData.board[index];
    console.log(boardValue);

    function getSquareValue() {
      if (boardValue.toNumber() === 0) {
        return "";
      } else if (boardValue.toNumber() === 1) {
        return "X";
      } else {
        return "O";
      }
    }

    return (
      <div
        className="bg-blue-400 h-44 w-44"
        onClick={() => markSpaceForGame(gameData.gameId.toString(), index)}
      >
        {getSquareValue()}
      </div>
    );
  }
}
