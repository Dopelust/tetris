import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const colors = ["white", "red", "green", "blue", "cyan", "magenta", "yellow"];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
function arrOutOfBounds(arr, i) {
  return i < 0 || i >= arr.length;
}

function Square(props) {
  return (
    <button className="square" style={{background: colors[props.value]}}></button>
  );
}

class Board extends React.Component {
  renderSquare(index) {
    return <Square value={index}/>;
  }
  renderRow(row) {
    return (
      <div className="board-row">
        {row.map(squares => this.renderSquare(squares))}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.props.rows.map(row => this.renderRow(row))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loop: false,
        rows: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        tetris: {
          blocks: [],
          value: 0,
        },
    }
  }

  startLoop() {
    const rows = this.state.rows;
    for (let i = 0; i < rows.length; ++i) {
      for (let j = 0; j < rows[i].length; ++j) {
        rows[i][j] = 0;
      }
    }
    this.setState({ rows: rows, });
    this.gameLoop = setInterval(() => this.tick(), 10);
  }

  componentDidMount() {
    this.setState({loop : true});
    this.startLoop();
  };

  endLoop() {
    this.setState({loop : false});
    clearInterval(this.gameLoop);
  }

  componentWillUnmount() {
    this.endLoop();
  }

  onNewGame() {
    if (this.loop) {
      this.endLoop();
    }
    this.startLoop();
  }

  applyTetris(rows, blocks, value) {
    for (let i = 0; i < blocks.length; ++i) {
      rows[blocks[i][0]][blocks[i][1]] = value;
    }
  }

  isEmpty(rows, x, y) {
    return rows[x][y] === 0;
  }
  canMove(rows, blocks, x, y) {
    for (let i = 0; i < blocks.length; ++i) {
      if (arrOutOfBounds(rows, blocks[i][0] + x) ||
          arrOutOfBounds(rows[blocks[i][0] + x], blocks[i][1] + y) ||
          !this.isEmpty(rows, blocks[i][0] + x, blocks[i][1] + y)) {
        return false;
      }
    }
    return true;
  }

  moveTetris(x, y) {
    const rows = this.state.rows.slice();
    const tetris = Object.assign({}, this.state.tetris);
    if (this.canMove(rows, tetris.blocks, x, y)) {
      this.applyTetris(rows, tetris.blocks, 0);

      for (let i = 0; i < tetris.blocks.length; ++i) {
        tetris.blocks[i][0] += x;
        tetris.blocks[i][1] += y;
      }
      this.applyTetris(rows, tetris.blocks, tetris.value);

      this.setState({
        rows: rows,
        tetris: tetris,
      });
      return true;
    }
    return false;
  }

  spawnTetris() {
    const tetris = {
      blocks: [[0, 3], [0, 4], [0, 5], [0, 6]],
      value: getRndInteger(1, colors.length),
    };
    const rows = this.state.rows.slice();

    if (this.canMove(rows, tetris.blocks, 0, 0)) {
      this.applyTetris(rows, tetris.blocks, tetris.value);
      this.setState({
        rows: rows,
        tetris: tetris,
      });
    }
    else {
      this.endLoop();
      //alert("lose");
    }
  }

  tick() {
    if (this.state.tetris.blocks.length === 0) {
      this.spawnTetris();
    }
    else {
      if (!this.moveTetris(1, 0))
        this.spawnTetris();
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board rows={this.state.rows}/>
          <button onClick={() => this.onNewGame()}>New Game</button>
        </div>
        <div className="game-info">
          <div>{}</div>
          <ol>{}</ol>
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
