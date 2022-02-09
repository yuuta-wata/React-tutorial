import { Component } from "react";

import { Square } from "../Square";

import type { Props, State } from "./type";

export class Board extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  onHandleClick = (i: number) => {
    const { squares, xIsNext } = this.state;
    const squaresCopy = squares.slice();

    squaresCopy[i] = xIsNext ? "X" : "O";

    this.setState({
      squares: squaresCopy,
      xIsNext: !xIsNext,
    });
  };

  renderSquare = (i: number) => {
    const { squares } = this.state;

    return (
      <Square
        value={squares[i]}
        onClick={() => {
          this.onHandleClick(i);
        }}
      />
    );
  };

  calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        console.log("winner:", squares[a]);
        return squares[a];
      }
    }
    return null;
  };

  render() {
    const { squares, xIsNext } = this.state;
    const winner = this.calculateWinner(squares);

    let status = "";
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
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
