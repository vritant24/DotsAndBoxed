import React, { Component } from 'react';
import VerticalLine from './VerticalLine.jsx';
import FillerBox from './FillerBox.jsx';

export default class VerticalRow extends Component {
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
          <VerticalLine key={"cell" + i} className="VerticalLine" cell={_row[i]}
          makeLine={this.makeLine.bind(this, i)}/>
        );
        cellArray.push(
          <FillerBox key={"cell" + (i + 1)} className="FillerBox" cell={_row[i + 1]}/>
        );
      }
      cellArray.push(
        <VerticalLine key={"cell" + i} className="VerticalLine" cell={_row[i]}
        makeLine={this.makeLine.bind(this, i)}/>
      );
      return cellArray;
    })();
    return(
      <tr className="VerticalRow">
        {cells}
      </tr>
    );
  }
}
