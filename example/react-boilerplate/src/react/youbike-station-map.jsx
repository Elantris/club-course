// youbike-station-map.jsx

var React = require('react');

var ACCESS_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';
var ATTR = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>';
var URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + ACCESS_TOKEN;

var TP = require('./YouBikeTP.json');

var YouBikeStationMap = React.createClass({
    map: null,
    markers: {},
    getInitialState: function() {
        return {
            filter: 5
        };
    },
    componentDidMount: function() {
        var mapbox_light = L.tileLayer(URL, {
            attribution: ATTR,
            id: 'mapbox.light'
        });
        this.map = L.map(this.refs.container, {
            center: [25.0330, 121.5654],
            zoom: 12,
            layers: [mapbox_light]
        });
        this.drawMarkers(this.state.filter);
    },
    drawMarkers: function(filter) {
        for (var i in this.markers) {
            this.markers[i].removeFrom(this.map);
        }
        for (var i in TP.retVal) {
            if (~~TP.retVal[i].sbi >= filter) {
                this.markers[i] = L.circle([TP.retVal[i].lat, TP.retVal[i].lng], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 10,
                }).addTo(this.map);
            }
        }
    },
    handleFilter: function() {
        this.setState({
            filter: this.refs.filter.value
        });
    },
    componentWillUpdate: function(nextProps, nextState) {
        this.drawMarkers(nextState.filter);
    },
    render: function() {
        return (
            <div>
                <h1>YouBike Station Map</h1>
                <div ref="container" style={{height: '400px'}} />
                <input ref="filter" type="number" defaultValue={this.state.filter} onChange={this.handleFilter} />
            </div>
        )
    }
});

module.exports = YouBikeStationMap;