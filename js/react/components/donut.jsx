import React from 'react';
import Chart from './chart.jsx';

class Donut extends React.Component {

  render() {
    return (
      <Chart chartType="Doughnut" data={this.props.data} width={this.props.width || '200px'} height={this.props.height || '200px'} options={this.props.options}/>
    );
  }
}

export default Donut;
