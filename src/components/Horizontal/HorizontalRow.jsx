import React, { Component } from 'react';
import Dot from './Dot.jsx';
import HorizontalLine from './HorizontalLine.jsx';

export default class HorizontalRow extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    var _row = this.props.row;
    var nextRow = nextProps.row;
    for(var i = 0; i < _row.length; i++) {
      if(_row[i] !== nextRow[i]) {
        return true;
      }
    }
    return false;
  }
  makeLine(index) {
    this.props.playMove(index);
  }
  render() {
    var cells = (() => {
      var cellArray = [];
      var _row = this.props.row;
      for(var i = 0; i < _row.length - 1; i += 2) {
        cellArray.push(
          <Dot key={"cell" + i} className="Dot"/>
        );
        cellArray.push(
          <HorizontalLine key={"cell" + i + 1} className="HorizontalLine" cell={_row[i + 1]}
          makeLine={this.makeLine.bind(this, (i + 1))}/>
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
