import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const colors = ["white", "yellow", "cyan", "orange", "blue", "magenta", "green", "red"];
const tetromino = [
  {
    blocks: [],
    pivot: [],
    value: 0,
  },
  {
    blocks: [[0, 4], [0, 5], [1, 4], [1, 5]], //O
    pivot: [0.5, -0.5],
    value: 1,
  },
  {
    blocks: [[0, 3], [0, 4], [0, 5], [0, 6]], //I
    pivot: [0.5, 0.5],
    value: 2,
  },
  {
    blocks: [[0, 4], [1, 4], [2, 4], [2, 5]], //L>
    pivot: [0, 0],
    value: 3,
  },
  {
    blocks: [[0, 5], [1, 5], [2, 5], [2, 4]], //L<
    pivot: [0, 0],
    value: 4,
  },
  {
    blocks: [[0, 4], [1, 4], [2, 4], [1, 5]], //T
    pivot: [0, 0],
    value: 5,
  },
  {
    blocks: [[0, 4], [1, 4], [1, 5], [2, 5]], //Z>
    pivot: [0, 0],
    value: 6,
  },
  {
    blocks: [[0, 5], [1, 5], [1, 4], [2, 4]], //Z<
    pivot: [0, 0],
    value: 7,
  },
]
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
function arrOutOfBounds(arr, i) {
  return i < 0 || i >= arr.length;
}

function Square(props) {
  return (
    <button className="square" style={{background: colors[props.value],
      borderTop: props.t ? " solid #eee" : "0px solid",
      borderBottom: props.b ? " solid" : "0px solid",
      borderLeft: props.l ? " solid #eee" : "0px solid",
      borderRight: props.r ? " solid" : "0px solid",}}></button>
  );
}

class Board extends React.Component {
  renderRow(rows, row, rowIndex) {
    return (
      <div className="board-row" key={rowIndex}>
        {row.map((square, index) => <Square l={index === 0 || (row[index] > 0 && row[index - 1] === 0)}
                                            r={index === 9 || (row[index] > 0 && row[index + 1] === 0)}
                                            t={rowIndex === 0 || (row[index] > 0 && rows[rowIndex - 1][index] === 0)}
                                            b={rowIndex === 15 || (row[index] > 0 && rows[rowIndex + 1][index] === 0)}
                                            value={square} key={index}/>)}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.props.rows.map((row, rowIndex) => this.renderRow(this.props.rows, row, rowIndex))}
      </div>
    );
  }
}

const scorePadding = "000000000";
class ScoreCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreCount: 0,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.lerp)
      this.lerp = setInterval(() => this.lerpScore(), 1000/60)
  }
  lerpScore() {
    let score = this.state.scoreCount;

    score += (this.props.score - score) / 3 + 1;
    if (score >= this.props.score) {
      score = this.props.score;
      clearInterval(this.lerp);
      this.lerp = null;
    }

    this.setState({ scoreCount:score });
  }
  render() {
    return (
        <div className="score">
          {(scorePadding + this.state.scoreCount.toFixed(0)).slice(-scorePadding.length)}
        </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        score: 0,
        speed: 300,
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

  clearRow(row) {
    for (let i = 0; i < row.length; ++i) {
      row[i] = 0;
    }
  }
  clearBoard() {
    const rows = this.state.rows;
    for (let i = 0; i < rows.length; ++i) {
      this.clearRow(rows[i]);
    }
    const tetris = this.state.tetris;
    tetris.blocks = [];
    this.setState({ rows: rows, tetris: tetris, score: 0});
  }

  onLoop() {
    this.gameLoop = setTimeout(() => this.tick(), this.state.speed);
  }
  endLoop() {
    if (this.gameLoop) {
      clearTimeout(this.gameLoop);
      this.gameLoop = null;
    }
  }
  overwriteLoop() {
    this.endLoop();
    this.tick();
  }
  componentDidMount() {
    this.clearBoard();
    this.onLoop();
  };

  componentWillUnmount() {
    this.endLoop();
  }

  onNewGame() {
    this.endLoop();
    this.clearBoard();
    this.onLoop();
  }

  applyTetris(rows, blocks, value) {
    for (let i = 0; i < blocks.length; ++i) {
      if (!arrOutOfBounds(rows, blocks[i][0]) && !arrOutOfBounds(rows[blocks[i][0]], blocks[i][1]))
              rows[blocks[i][0]][blocks[i][1]] = value;
    }
  }

  isEmpty(rows, x, y) {
    return rows[x][y] === 0;
  }
  isRepeat(blocks, i, x, y) {
    for (let j = 0; j < blocks.length; ++j) {
      if (i === j)
        continue;
      if (blocks[i][0] + x === blocks[j][0] && blocks[i][1] + y === blocks[j][1])
        return true;
    }
    return false;
  }
  canMove(rows, blocks, x, y) {
    for (let i = 0; i < blocks.length; ++i) {
      if (arrOutOfBounds(rows, blocks[i][0] + x))
        return 0;
      else if (arrOutOfBounds(rows[blocks[i][0] + x], blocks[i][1] + y))
        return 2;
      else if (!this.isRepeat(blocks, i, x, y) && !this.isEmpty(rows, blocks[i][0] + x, blocks[i][1] + y))
        return y === 0 ? -1 : 2;
    }
    return 1;
  }

  onMoveTetris(x, y) {
    const rows = this.state.rows.slice();
    const tetris = Object.assign({}, this.state.tetris);
    switch (this.canMove(rows, tetris.blocks, x, y)) {
      case 2:
        y = 0; //fallthrough
      case 1:
        this.applyTetris(rows, tetris.blocks, 0);
        this.shiftBlocks(tetris.blocks, x, y);
        this.applyTetris(rows, tetris.blocks, tetris.value);

        this.setState({
          rows: rows,
          tetris: tetris,
        });
        return true;
      default:
        return false;
    }
  }
  moveTetris(x, y) {
    if (!this.onMoveTetris(x, y)) {
      this.checkBoard();
      this.spawnTetris();
    }
  }
  moveTetrisRecursive(x, y) {
    while (this.onMoveTetris(x, y)) {}
  }

  checkRow(row) {
    for (let i = 0; i < row.length; ++i) {
      if (row[i] === 0)
        return false;
    }
    return true;
  }
  shiftRows(rows, i) {
    for (let j = i; j >= 0; --j) {
      rows[j] = j > 0 ? rows[j - 1].slice() : new Array(10).fill(0);
    }
  }

  checkBoard() {
    const rows = this.state.rows.slice();
    let score = this.state.score;
    for (let i = rows.length - 1; i >= 0; --i) {
      if (this.checkRow(rows[i])) {
        score += 1000;
        this.shiftRows(rows, i);
        ++i;
      }
    }
    this.setState({
      score: score,
      rows: rows,
    });
  }

  getRotatedTetrisLeft(px, py, x, y, size) {
    let tx = x - px;
    let ty = y - py;
    return {
      x: -1 * ty + px,
      y: 1 * tx + py,
    }
  }
  getRotatedTetrisRight(px, py, x, y, size) {
    let tx = x - px;
    let ty = y - py;
    return {
      x: 1 * ty + px,
      y: -1 * tx + py,
    }
  }

  shiftBlocks(blocks, x, y) {
    for (let i = 0; i < blocks.length; ++i) {
      blocks[i][0] += x;
      blocks[i][1] += y;
    }
  }
  unclipTetris(rows, blocks) { //Unclips the current tetromino
    for (let i = 0; i < blocks.length; ++i) {
      while (blocks[i][0] < 0) { //If clipped on top, shift down
        this.shiftBlocks(blocks, 1, 0);
      }
      while (blocks[i][0] >= rows.length) { //If clipped below, shift up
        this.shiftBlocks(blocks, -1, 0);
      }
      while (blocks[i][1] < 0) { //If clipped left, shift right
        this.shiftBlocks(blocks, 0, 1);
      }
      while (blocks[i][1] >= rows[0].length) { //If clipped right, shift left
        this.shiftBlocks(blocks, 0, -1);
      }
      while (!this.isEmpty(rows, blocks[i][0], blocks[i][1])) { //If clipped into other tetrominoes, shift up
        this.shiftBlocks(blocks, -1, 0);
      }
    }
  }
  rotateTetris() {
    const rows = this.state.rows.slice();
    const tetris = Object.assign({}, this.state.tetris);

    this.applyTetris(rows, tetris.blocks, 0);
    let px = tetris.blocks[tetris.blocks.length/2 - 1][0] + tetris.pivot[0],
     py = tetris.blocks[tetris.blocks.length/2 - 1][1] + tetris.pivot[1];
    for (let i = 0; i < tetris.blocks.length; ++i) {
      let rotated = this.getRotatedTetrisRight(px, py, tetris.blocks[i][0], tetris.blocks[i][1]);
      tetris.blocks[i][0] = rotated.x;
      tetris.blocks[i][1] = rotated.y;
    }
    let rotated = this.getRotatedTetrisRight(0, 0, tetris.pivot[0], tetris.pivot[1]);
    tetris.pivot[0] = rotated.x;
    tetris.pivot[1] = rotated.y;

    this.unclipTetris(rows, tetris.blocks);
    this.applyTetris(rows, tetris.blocks, tetris.value);

    this.setState({
      rows: rows,
      tetris: tetris
    });
  }

  spawnTetris() {
    const tetris = JSON.parse(JSON.stringify(tetromino))[getRndInteger(1, tetromino.length)];
    const rows = this.state.rows.slice();
    if (this.canMove(rows, tetris.blocks, 0, 0) > 0) {
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
      this.moveTetris(1, 0);
    }

    this.onLoop();
  }

  handleKeyPress(event) {
    //if (!this.gameLoop)
      //return;
    switch (event.key) {
      case 'ArrowLeft': //Left
        this.moveTetris(0, -1);
        break;
      case 'ArrowUp': //Up
        this.rotateTetris(this.state.tetris);
        break;
      case 'ArrowRight': //Right
        this.moveTetris(0, 1);
        break;
      case 'ArrowDown': //Down
        this.moveTetris(1, 0);
        break;
      case ' ':
        this.moveTetrisRecursive(1, 0);
        break;
      case 'r':
        this.onNewGame();
        break;
      case 's':
        if (this.gameLoop) {
          this.endLoop();
        }
        else {
          this.onLoop();
        }
        break;
      default:
         break;
    }
  }

  onSpeedChange(event) {
    this.setState({
      speed: event.target.value,
    });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board" onKeyDown={(event) => {this.handleKeyPress(event)}}>
          <ScoreCounter score={this.state.score}/>
          <Board rows={this.state.rows}/>
          <br/>
          <button className="keycapButton" onClick={() => this.onNewGame()}>R</button>  to Reset
          <br/><br/><br/>Speed:&nbsp;
          <input type="range" style={{direction:"rtl"}} value={this.state.speed} min="100" max="500" onChange={(event) => {this.onSpeedChange(event)}}></input>
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
