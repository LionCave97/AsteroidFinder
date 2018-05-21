var React = require("react");
var Chart = require("react-google-charts").Chart;

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CssBaseline from '@material-ui/core/CssBaseline';

class DashCharts extends React.Component {

  constructor() {
    super();
    this.state = {
      max: 10,
      days: [],
      lookup: [],
      done: false
    };

  }

  componentWillMount() {
    for (var i = 0; i < this.state.max; i++) {
      var date = new Date();
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // Stackoverflow// https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/22198300
      date.setDate(date.getDate() - i);
      var day = date.getDate();
      var today = date.getFullYear()+"-"+month+ "-"+day;
      this._getDayAstroids(today);

    }
    this._fetchResponseNeoLookup(2207398);
  }

  _getDayAstroids(day){

    jQuery.ajax({
      method: "GET",
      url: "https://api.nasa.gov/neo/rest/v1/feed?start_date="+ day +"&end_date="+ day +"&api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
      success: (answers) => {
        this._processAstroids(answers.near_earth_objects[day]);
        // console.log(answers);
      }


    });

    var done = true;
    this.setState({done: done});

  }

  _fetchResponseNeoLookup(key) {
    jQuery.ajax({
      method: "GET",
      url: "https://api.nasa.gov/neo/rest/v1/neo/"+ key +"?api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
      success: (answers) => {
        console.log(answers);
        this.setState({lookup: answers});


      }
    });
  }

  _processAstroids(objects){
    var days = this.state.days.concat([]);
     days.push(objects);
    this.setState({days: days});


  }

  _getAstroidPieRow(){
    var rows = [];
    let planets = [];
    let planetCount = [];
    for (var i = 0; i < this.state.lookup.close_approach_data.length; i++) {

      if ( planets.indexOf(this.state.lookup.close_approach_data[i].orbiting_body) < 0 ) {
        planetCount.push(1);
        planets.push(this.state.lookup.close_approach_data[i].orbiting_body)
      } else {
        var index = planets.indexOf(this.state.lookup.close_approach_data[i].orbiting_body);
        planetCount[index]++;

      }
      console.log(planets);
      console.log(planetCount);


    }
    for (var i = 0; i < planets.length; i++) {
      let row = [planets[i], planetCount[i]];
        rows.push(row);
    }

    return rows;

  }

  _getAstroidLineRow(){
    var rows = [];
    for (var i = 0; i < this.state.max; i++) {
      var date = new Date();
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // Stackoverflow// https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/22198300
      date.setDate(date.getDate() - i);
      var day = date.getDate();
      var today = date.getFullYear()+"-"+month+ "-"+day;
      let astroids = this.state.days[i].length
      let row = [today, astroids]
      rows.push(row);

    }
    return rows;

  }

  _getAstroidBarRow(){
    var rows = [];
    for (var i = 0; i < this.state.max; i++) {
      var date = new Date();
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // Stackoverflow// https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/22198300
      date.setDate(date.getDate() - i);
      var day = date.getDate();
      var today = date.getFullYear()+"-"+month+ "-"+day;
      let asteroids = 0;
      for (var s = 0; s < this.state.days[i].length; s++) {
        let asteroidDay = this.state.days[i];

        if (asteroidDay[s].is_potentially_hazardous_asteroid === true) {
          asteroids++;
        }

      }
      let row = [today, asteroids]
      rows.push(row);

    }
    return rows;

  }

  render() {

    var date = new Date();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Stackoverflow// https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/22198300

    var day = date.getDate();
    var today = date.getFullYear()+"-"+month+ "-"+day;

      if (this.state.days.length > this.state.max-1 && this.state.done === true) {
        return (
          <div className="con">
          <div className="chart">
          <Card className="con">
          <h3> Today it is the {today}</h3>
          </Card>

          <Card className="con">
          <h3> Showing the orbit pattern of 207398 (2006 AS2) Asteroid</h3>
          <Chart
            chartType="PieChart"
            options={{title: "Planet", hAxis: {title: "Asteroid Count"}, vAxis: {title: "Asteroid"}}}
            rows={this._getAstroidPieRow()}
            columns={[{label: "Asteroid", type: "string"}, {label: "Planet", type: "number"}]}
            graph_id={"asteroids-planet"}
            width="100%"
            height="400px"
            />
            </Card>
          </div>
          <div className="chart">
          <Card className="con">
          <h3>The Asteroid activity for the last {this.state.max} days.</h3>
          <Chart
            chartType="LineChart"
            options={{title: "Date", hAxis: {title: "Asteroid Count"}, vAxis: {title: "Days"}}}
            rows={this._getAstroidLineRow()}
            columns={[{label: "Day", type: "string"}, {label: "Asteroid count", type: "number"}]}
            graph_id={"asteroids-count"}
            width="100%"
            height="400px"
            />
            </Card>
          </div>
          <div className="chart">
          <Card className="con">
          <h3>The amount of Asteroids that may have potentially hazardous to the earth for the past {this.state.max} days.</h3>
          <Chart
            chartType="BarChart"
            options={{title: "Date", hAxis: {title: "Hazardous asteroids"}, vAxis: {title: "Days"}}}
            rows={this._getAstroidBarRow()}
            columns={[{label: "Day", type: "string"}, {label: "Hazardous asteroids", type: "number"}]}
            graph_id={"asteroids-hazardous"}
            width="100%"
            height="400px"
            />
            </Card>
          </div>
          </div>

        );
      } else {
        return null;
      }

  }
}

module.exports = DashCharts;
