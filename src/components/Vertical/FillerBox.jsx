import React, { Component } from 'react';

export default class FillerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: props.cell
    };
  }
  shouldComponentUpdate(nextProps) {
    return !(this.state.cell === nextProps.cell);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      cell: nextProps.cell
    });
  }
  render() {
    return (
      <td className={"FillerBox P" + this.state.cell} />
    );
  }
}
