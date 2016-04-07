import React from 'react';
import ChartJS from 'chartjs';

class Chart extends React.Component {

  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d');
    this.chart = new ChartJS(this.ctx);
    this.chart[this.props.chartType](this.props.data, this.props.options);
  }

  render() {
    return (
      <canvas height={this.props.height} width={this.props.width} ref="canvas"></canvas>
    );
  }
}

export default Chart;
