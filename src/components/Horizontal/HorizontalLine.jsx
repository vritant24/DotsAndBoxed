import React, { Component } from 'react';

export default class HorizontalLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: props.cell
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      cell: nextProps.cell
    });
  }
  shouldComponentUpdate(nextProps) {
    return !(this.state.cell === nextProps.cell);
  }
  render() {
    return (
      <td className={"HorizontalLine L" + this.state.cell} onClick={this.props.makeLine}/>
    );
  }
}
