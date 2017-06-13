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
        row: 10,
        col: 10
      }
    };
  }
  nextPlayer() {
    var nextPlayer = 1 + ((this.state.currentPlayer + 1) % this.state.numPlayers)
    this.setState({
      currentPlayer: nextPlayer;
    });
  }
  incrementScore(player) {
    var _score = this.state.score.slice();
    _score[player]++;
    this.setState({
      score: _score;
    });
  }
  render() {
    return(
      <div>
        <Grid nextPlayer={this.nextPlayer.bind(this)} incrementScore={this.incrementScore.bind(this)} gridSize={this.state.gridSize} numPlayers={this.state.numPlayers}/>
      </div>
    );
  }
}
