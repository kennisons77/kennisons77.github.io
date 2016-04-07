import React from 'react';
import Chart from './chart.jsx';
import _ from 'lodash';

var defaultOptions = {
  bezierCurve: false,
  pointDotRadius : 8,
  datasetStrokeWidth: 5,
  scaleGridLineWidth: 2,
  scaleShowGridLines: true,
  scaleShowVerticalLines: false,
  scaleStepWidth: 0,
  scaleStartValue: -50,
  scaleLineColor: 'transparent'
};

class LineChart extends React.Component {

  render() {
    var options = _.extend(_.clone(defaultOptions), this.props.options || {});

    return (
      <Chart chartType="Line" data={this.props.data} options={options} width={this.props.scaleStepWidth || '550px'} height={this.props.height || '150px'}/>
    );
  }
}

export default LineChart;
