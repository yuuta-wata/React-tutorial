import { Component } from "react";

import { Board } from "./components/Board";

type Props = {};

type State = {
  history: {
    squares: any[];
  }[];
  xIsNext: boolean;
  stepNumner: number;
};

export class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumner: 0,
      xIsNext: true,
    };
  }

  onHandleClick = (i: number) => {
    const { history, xIsNext, stepNumner } = this.state;
    const organizeHistory = history.slice(0, stepNumner + 1);
    const current = organizeHistory[organizeHistory.length - 1];
    const duplicateSquares = current.squares.slice();

    if (this.calculateWinner(duplicateSquares) || duplicateSquares[i]) {
      return;
    }

    duplicateSquares[i] = xIsNext ? "X" : "O";

    this.setState({
      history: organizeHistory.concat([
        {
          squares: duplicateSquares,
        },
      ]),
      stepNumner: organizeHistory.length,
      xIsNext: !xIsNext,
    });
  };

  jumpTo = (step: number) => {
    this.setState({
      stepNumner: step,
      xIsNext: step % 2 === 0,
    });
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
    const { history, xIsNext, stepNumner } = this.state;
    const current = history[stepNumner];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((_square, index) => {
      const desc = index ? `Go to move #${index}` : `Go to game start`;
      return (
        <li key={index}>
          <button
            onClick={() => {
              this.jumpTo(index);
            }}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            xIsNext={xIsNext}
            onClick={(index) => this.onHandleClick(index)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
