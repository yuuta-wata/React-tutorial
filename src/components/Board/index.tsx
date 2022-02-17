import { Component } from "react";

import { Square } from "../Square";

import type { Props } from "./type";

export class Board extends Component<Props> {
  renderSquare = (i: number) => {
    const { squares, onClick } = this.props;

    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
