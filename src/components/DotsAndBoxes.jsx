import React, { Component } from 'react';
import Grid from './Grid.jsx';

export default class DotsAndBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 1,
      numPlayers: 2,
      score: [],
      gridSize: {
        row: 8,
        col: 8
      },
      gameOver: false
    };
  }
  componentWillMount() {
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
    var scores = this.state.score.map((points, index) => {
    return (
        <h3 className="PlayerScore" key={index}> Player{index + 1} - {points}</h3>
      );
    });
    return(
      <div>
        <h1 className={"T" + this.state.currentPlayer}>player {this.state.currentPlayer} turn</h1>
        <div className= "Scores">
          {scores}
        </div>
        <Grid gameOver={this.gameOver.bind(this)} nextPlayer={this.nextPlayer.bind(this)}
        incrementScore={this.incrementScore.bind(this)} gridSize={this.state.gridSize}
        numPlayers={this.state.numPlayers} currentPlayer={this.state.currentPlayer}/>
      </div>
    );
  }
}
