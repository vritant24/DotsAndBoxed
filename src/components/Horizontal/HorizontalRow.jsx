import React, { Component } from 'react';
import Dot from './Dot.jsx';
import HorizontalLine from './HorizontalLine.jsx';

export default class HorizontalRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      row: nextProps.row
    });
  }
  makeLine(index) {
    this.props.playMove(index);
  }
  render() {
    var cells = (() => {
      var cellArray = [];
      var _row = this.state.row;
      for(var i = 0; i < _row.length - 1; i += 2) {
        cellArray.push(
          <Dot key={"cell" + i} className="Dot"/>
        );
        cellArray.push(
          <HorizontalLine key={"cell" + i + 1} className="HorizontalLine" cell={_row[i + 1]} makeLine={this.makeLine.bind(this, (i + 1))}/>
        );
      }
      cellArray.push(
        <Dot key={"cell + i"} className="Dot"/>
      );
      return cellArray;
    })();
    return(
      <tr className="HorizontalRow">
        {cells}
      </tr>
    );
  }
}
