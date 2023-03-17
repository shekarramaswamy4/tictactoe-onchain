import React from "react";

export default class Board extends React.Component {
  render() {
    const { player, gameData } = this.props;
    console.log(gameData);
    const { playerX, playerY, board, finished, winner } = gameData;

    return (
      <div class="grid grid-cols-3 grid-rows-3 gap-4">
        {board.map((square, index) => {
          return <Square value={square} />;
        })}
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return <h3>square</h3>;
  }
}
