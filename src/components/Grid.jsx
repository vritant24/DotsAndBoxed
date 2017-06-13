import React, { Component } from 'react';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playgrid: this.setUpPlayGrid(),
      currentPlayer: 1
    }
    this.gridSize = props.gridSize;
    this.numPlayers = this.numPlayers;
  }
  render() {

  }
}
