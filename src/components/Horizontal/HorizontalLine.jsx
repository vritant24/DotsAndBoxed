import React, { Component } from 'react';

export default class HorizontalLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: props.cell
    };
  }
  render() {
    return (
      <td className={"HorizontalLine" + this.state.cell} onClick={this.props.makeLine}/>
    );
  }
}
