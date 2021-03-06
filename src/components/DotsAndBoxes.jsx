import React, { Component } from 'react';
import Grid from './Grid.jsx';

export default class DotsAndBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 1,
      numPlayers: 3,
      score: [],
      gridSize: {
        row: 5,
        col: 6
      },
      gameOver: false
    };
  }
  componentWillMount() {
    this.setScores();
  }
  reset = () => {
    this.setState((prevState) => {
      return {
        currentPlayer: 1,
        numPlayers: prevState.numPlayers,
        score: [],
        gridSize: {
          row: prevState.gridSize.row,
          col: prevState.gridSize.col
        },
        gameOver: false
      }
    });
    this.setScores();
  }
  setScores(numplayer) {
    //set up score array for n players
    var score = [];
    for(var i = 0; i < this.state.numPlayers; i++) {
      score.push(0);
    }
    this.setState({
      score
    });
  }
  nextPlayer() {
    //next player's move
    var nextPlayer = ((this.state.currentPlayer + 1) % (this.state.numPlayers + 1));
    nextPlayer = (nextPlayer === 0) ? 1 : nextPlayer;
    this.setState({
      currentPlayer: nextPlayer
    });
  }
  incrementScore(player) {
    var _score = this.state.score.slice();
    ++_score[player - 1];
    this.setState({
      score: _score
    });
  }
  gameOver() {
    this.setState({
      gameOver: true
    });
  }
  render() {
    var header = (() => {
      if(this.state.gameOver) {
        var winner;
        var highScore = 0;
        var _score = this.state.score;
        for(var i = 0; i < _score.length; i++) {
          if(highScore < _score[i]) {
            highScore = _score[i];
            winner = i;
          }
        }
        if(!winner) {
          return(
            <h1 className={"T0"}>Draw</h1>
          );
        } else {
          winner++;
          return(
            <h1 className={"T" + winner}>Player {winner} wins</h1>
          );
        }
      } else {
        return(
          <h1 className={"T" + this.state.currentPlayer}>Player {this.state.currentPlayer} Turn</h1>
        );
      }
    })();
    var scores = this.state.score.map((points, index) => {
    return (
        <h3 className="PlayerScore" key={index}> Player {index + 1} ({points})</h3>
      );
    });
    return(
      <div>
        <div className="Header">
          {header}
          <div className= "Scores">
            {scores}
          </div>
        </div>
        <div className="DotsAndBoxes">
          <Grid gameOver={this.gameOver.bind(this)} nextPlayer={this.nextPlayer.bind(this)}
          incrementScore={this.incrementScore.bind(this)} gridSize={this.state.gridSize}
          numPlayers={this.state.numPlayers} currentPlayer={this.state.currentPlayer} reset={this.reset}/>
        </div>
      </div>
    );
  }
}
