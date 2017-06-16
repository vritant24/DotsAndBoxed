import React, { Component } from 'react';
import HorizontalRow from './horizontal/HorizontalRow.jsx';
import VerticalRow from './vertical/VerticalRow.jsx';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.gridSize = props.gridSize;
    this.numPlayers = props.numPlayers;
    this.numBoxes = 0;
    this.state = {
      playGrid: this.setUpPlayGrid(),
      currentPlayer: 1
    };
  }
  componentWillReceiveProps(nextProps) {
    this.gridSize = nextProps.gridSize;
    this.numPlayers = nextProps.numPlayers;
    //TODO reset game
    this.setState({
      currentPlayer: nextProps.currentPlayer
    });
  }
  reset = () => {
    this.setState({
      playGrid: this.setUpPlayGrid(),
      currentPlayer: 1
    });
    this.numBoxes = 0;
    this.props.reset();
  }
  setUpPlayGrid() {
    var matrix = [];
    for(var i = 0; i < (2 * this.gridSize.row) + 1; i++) {
      matrix.push([]);
      for(var j = 0; j < (2 * this.gridSize.col) + 1; j++) {
        if(i % 2 === 0 && j % 2 === 0) {
          matrix[i][j] = -1;  // Dots
        } else {
          matrix[i][j] = 0;   // Vertical Lines, Horizontal Lines, Filler Boxes
        }
      }
    }
    return matrix;
  }
  playMove(x, y) {
    //check if already played
    if(this.state.playGrid[x][y] !== 0) {
      return;
    }

    //not mutate --------------------------------
    var _playGrid = clone(this.state.playGrid);

    //change the the value of the cell 1
    _playGrid[x][y] = 1;
    this.setState({
      playGrid: _playGrid
    });

    //check if move makes for a point
    if(this.judgeMove(x, y)) {
      //check if no more moves can be made
      if(this.checkGameOver()) {
        this.props.gameOver();
      }
      return;
    }
    //next player's turn
    this.props.nextPlayer();
  }
  judgeMove(x, y) {
    var result = false;

    //if Horizontal, check top+2 and bottom-2, else left-2 and right+2
    if(y % 2 === 1) {
      result = this.checkForHorizontal(x, y);
    } else {
      result = this.checkForVertical(x, y);
    }

    return result;
  }
  checkForVertical(x, y) {
    var result = false;
    var sum1 = 0;
    var sum2 = 0;
    var _playGrid = this.state.playGrid;
    //check top left and right
    if(x > 0) {
      if(y > 0) {
        sum1 += _playGrid[x - 1][y - 1];
      }
      if(y < _playGrid[0].length) {
        sum2 += _playGrid[x - 1][y + 1];
      }
    }
    //check bottom left and right
    if(x < _playGrid.length - 1) {
      if(y > 0) {
        sum1 += _playGrid[x + 1][y - 1];
      }
      if(y < _playGrid[0].length) {
        sum2 += _playGrid[x + 1][y + 1];
      }
    }
    //check top+2 and bottom-2
    if(y > 0) {
      sum1 += _playGrid[x][y - 2];
    }
    if(y < _playGrid[0].length - 2) {
      sum2 += _playGrid[x][y + 2];
    }
    //fill box if point
    if(sum1 === 3) {
      //increment player's score
      this.props.incrementScore(this.state.currentPlayer);
      this.fillBox(x, y - 1);
      result = true;
    }
    if(sum2 === 3) {
      //increment player's score
      this.props.incrementScore(this.state.currentPlayer);
      this.fillBox(x, y + 1);
      result = true;
    }
    return result;
  }
  checkForHorizontal(x, y) {
    var result = false;
    var sum1 = 0;
    var sum2 = 0;
    var _playGrid = this.state.playGrid;
    //check top left and right
    if(x > 0) {
      if(y > 0) {
        sum1 += _playGrid[x - 1][y - 1];
      }
      if(y < _playGrid[0].length) {
        sum1 += _playGrid[x - 1][y + 1];
      }
    }

    //check bottom left and right
    if(x < _playGrid.length - 1) {
      if(y > 0) {
        sum2 += _playGrid[x + 1][y - 1];
      }
      if(y < _playGrid[0].length) {
        sum2 += _playGrid[x + 1][y + 1];
      }
    }
    //check left-2 and right+2
    if(x > 1) {
      sum1 += _playGrid[x - 2][y];
    }
    if(x < _playGrid.length - 2) {
      sum2 += _playGrid[x + 2][y];
    }
    //fill box if point
    if(sum1 === 3) {
      //increment player's score
      this.props.incrementScore(this.state.currentPlayer);
      this.fillBox(x - 1, y);
      result = true;
    }
    if(sum2 === 3) {
      //increment player's score
      this.props.incrementScore(this.state.currentPlayer);
      this.fillBox(x + 1, y);
      result = true;
    }
    return result;
  }
  fillBox(x, y) {
    //done so that it doesn't interefere with the change made to playGrid in playMove
    this.setState((prevState) => {
      var _playGrid = clone(prevState.playGrid);
      _playGrid[x][y] = prevState.currentPlayer;
      return {playGrid: _playGrid};
    });
    this.numBoxes++;
  }
  checkGameOver() {
    if(this.numBoxes === (this.gridSize.row * this.gridSize.col)) {
      return true;
    }
  }
  render() {
    var rows = (() => {
      var rowArray = [];
      var _playGrid = this.state.playGrid;
      for(var i = 0; i < _playGrid.length - 1; i += 2) {
        rowArray.push(
          <HorizontalRow key={"row" + i} row={this.state.playGrid[i]}
          playMove={this.playMove.bind(this, i)}/>
        );
        rowArray.push(
          <VerticalRow key={"row" + (i + 1)} row={this.state.playGrid[i + 1]}
          playMove={this.playMove.bind(this, (i + 1))} />
        );
      }
      rowArray.push(
        <HorizontalRow key={"row" + i} row={this.state.playGrid[i]}
        playMove={this.playMove.bind(this, i)} />
      );

      return rowArray;
    })();

    return(
      <div>
        <table className="Grid">
          <tbody>
            {rows}
          </tbody>
        </table>
        <button className="Reset" onClick={this.reset}>New Game</button>
      </div>
    );
  }
};

var clone = (array) => {
  var newArray = array.map((item) => {
    return item.slice();
  });
  return newArray;
};
