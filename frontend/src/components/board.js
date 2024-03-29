import { BigNumber } from "ethers";
import React from "react";
import { classnames } from "../consts";

export default class Board extends React.Component {
  render() {
    const { player, gameData, markSpaceForGame } = this.props;
    console.log(gameData);
    const { playerO, playerX, board, finished, winner } = gameData;

    const isPlayerX = player === playerX;
    const isPlayerXTurn = gameData.turns.toNumber() % 2 === 0;

    const opponent = isPlayerX ? playerO : playerX;

    const didWin = winner === player;

    function inProgressGameDisplay() {
      return (
        <div className={"flex flex-col items-center mb-10"}>
          {isPlayerX ? (
            <p>You (X) vs. {playerO} (O)</p>
          ) : (
            <p>You (O) vs. {playerX} (X)</p>
          )}

          {(isPlayerX && isPlayerXTurn) || (!isPlayerX && !isPlayerXTurn)
            ? "It's your turn"
            : "Waiting for opponent..."}
        </div>
      );
    }

    // finished === true
    function finishedGameDisplay() {
      const text = didWin
        ? `You ${isPlayerX ? "(X)" : "(O)"} beat ${opponent}!`
        : `You ${isPlayerX ? "(X)" : "(O)"} lost to ${opponent} :(`;

      return (
        <div>
          <p>{text}</p>
        </div>
      );
    }

    function borderForGame() {
      if (didWin) {
        return "border-4 border-green-500";
      } else if (!didWin && finished) {
        return "border-4 border-red-500";
      }
      return "border-2 border-blue-500";
    }

    // Have different treatment for finished games vs. in progress
    return (
      <div
        className={classnames(
          "flex flex-col items-center rounded py-4 mb-6",
          borderForGame()
        )}
      >
        {finished ? finishedGameDisplay() : inProgressGameDisplay()}
        <div className="aspect-square w-[480px]">
          <div className="grid grid-cols-3 grid-rows-3">
            {board.map((_, index) => {
              return (
                <Square
                  key={index}
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
      const squareCss = "w-3/4 h-3/4";
      if (boardValue.toNumber() === 0) {
        return <div></div>;
      } else if (boardValue.toNumber() === 1) {
        return <img src="/x.png" alt="X" className={squareCss} />;
      } else {
        return <img src="/o.png" alt="O" className={squareCss} />;
      }
    }

    function bordersForBox() {
      // Can't use template variables in tailwind classes, hence this repeated stuff
      // find and replace is our friend...
      let borderClasses = "";
      if (index === 0) {
        borderClasses = `border-r-2 border-b-2 border-blue-500`;
      }
      if (index === 1) {
        borderClasses = `border-r-2 border-b-2 border-blue-500`;
      }
      if (index === 2) {
        borderClasses = `border-l2 border-b-2 border-blue-500`;
      }
      if (index === 3) {
        borderClasses = `border-r-2 border-b-2 border-blue-500`;
      }
      if (index === 4) {
        borderClasses = `border-r-2 border-b-2 border-blue-500`;
      }
      if (index === 5) {
        borderClasses = `border-b-2 border-l2 border-blue-500`;
      }
      if (index === 6) {
        borderClasses = `border-r-2 border-blue-500`;
      }
      if (index === 7) {
        borderClasses = `border-r-2 border-l2 border-blue-500`;
      }
      if (index === 8) {
        borderClasses = `border-l2 border-blue-500`;
      }
      return borderClasses;
    }

    return (
      <div
        className={classnames(
          "h-40 w-40 flex justify-center items-center",
          bordersForBox()
        )}
        onClick={() => markSpaceForGame(gameData.gameId.toString(), index)}
      >
        {getSquareValue()}
      </div>
    );
  }
}
