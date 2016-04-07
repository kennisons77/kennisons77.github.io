// Basic Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Basic Components
import Icons from './components/icons.jsx';
import Donut from './components/donut.jsx';
import LineChart from './components/line.jsx';
import Input from './components/input.jsx';
import StyleSidebar from './components/style-guide.jsx';

import $ from 'jquery';

$('.menu-item-header').click(function toggleMenu() {
  $('#accounts-nav-toggle').prop('checked', true);
});

Chart.defaults.global.responsive = true;

if (document.getElementById('icons')){
  ReactDOM.render(<Icons url="/img/sprite.svg"/>, document.getElementById('icons'));
}

var data = [
  {
      value: 300,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: "Red"
  },
  {
      value: 50,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Green"
  },
  {
      value: 100,
      color: "#FDB45C",
      highlight: "#FFC870",
      label: "Yellow"
  }
];

if (document.getElementById('basic-doughnut')){
  ReactDOM.render(<Donut data={data}/>, document.getElementById('basic-doughnut'));
}

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Name",
        fillColor: "rgba(0, 0, 0, 0)",
        pointColor: "rgb(21, 45, 60)",
        strokeColor: "rgb(6, 119, 190)",
        pointStrokeColor: "rgb(21, 45, 60)",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [10, 40, 45, 67, 80, 120, 130]
      }
    ]
};

if (document.getElementById('basic-line')){
  ReactDOM.render(<LineChart height="250px" width="500px" data={data}/>, document.getElementById('basic-line'));
}

if (document.getElementById('input-react')){
  ReactDOM.render(<Input type='text' id='input' label='Input'/>, document.getElementById('input-react'));
}

if (document.getElementById('input-react-maxlength')){
  ReactDOM.render(<Input maxlength="20" type='text' id='input' label='Input'/>, document.getElementById('input-react-maxlength'));
}

if (document.getElementById('input-react-required')){
  ReactDOM.render(<Input required type='text' id='input' label='Input'/>, document.getElementById('input-react-required'));
}

if (document.getElementById('style-guide-side-bar')){
  ReactDOM.render(<StyleSidebar components={document.getElementById('style-guide-components')}/>, document.getElementById('style-guide-side-bar'));
}