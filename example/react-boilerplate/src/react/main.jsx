// main.jsx

var React = require('react');
var ReactDOM = require('react-dom');
var MarkdownEditor = require('./markdown-editor.jsx');
var YouBikeStationMap = require('./youbike-station-map.jsx');

ReactDOM.render(<YouBikeStationMap />, document.getElementById('main'));
ReactDOM.render(<MarkdownEditor />, document.getElementById('main1'));
