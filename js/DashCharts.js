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
      max: 11,
      days: [],
      lookup: [],
      done: false
    };

  }

  componentWillMount() {
    var Tmax = this.state.max;
    for (var i = 0; i < this.state.max; i++) {
      var date = new Date();
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // Stackoverflow// https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/22198300
      date.setDate(date.getDate() - i);
      var day = date.getDate();
      if (day < 9) {
        day = "0"+day;
      }
      if (day !== 31) {
        var today = date.getFullYear()+"-"+month+ "-"+day;
        this._getDayAstroids(today);
      } else {
        Tmax = Tmax -1;
      }


    }
    this.setState({max: Tmax});

  }

  _getDayAstroids(day){

    jQuery.ajax({
      method: "GET",
      url: "https://api.nasa.gov/neo/rest/v1/feed?start_date="+ day +"&end_date="+ day +"&api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
      success: (answers) => {
        this._processAstroids(answers.near_earth_objects[day]);
      }


    });


  }

  // _fetchResponseNeoLookup(key) {
  //   jQuery.ajax({
  //     method: "GET",
  //     url: "https://api.nasa.gov/neo/rest/v1/neo/"+ key +"?api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
  //     success: (answers) => {
  //       this.setState({lookup: answers});
  //       this.setState({done: true});
  //     }
  //   });
  //
  // }

  _processAstroids(objects){
    var days = this.state.days.concat([]);
     days.push(objects);
    this.setState({days: days});


  }

  _getAstroidPieRow(){
    var rows = [];
    var asteroidsH = 0;
    var asteroidsF = 0;
    for (var i = 0; i < this.state.max; i++) {
      var date = new Date();
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // Stackoverflow// https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/22198300
      date.setDate(date.getDate() - i);
      var day = date.getDate();
      var today = date.getFullYear()+"-"+month+ "-"+day;
      let asteroids = 0;

      for (var s = 0; s < this.state.days[i].length; s++) {

        var row;
        let asteroidDay = this.state.days[i];
        if (asteroidDay[s].is_potentially_hazardous_asteroid == true) {
          asteroidsH++;
        } else {
          asteroidsF++;
        }

      }

    }
    row = ["Not Hazardous", asteroidsF];
    rows.push(row);
    row = ["Hazardous", asteroidsH];
    rows.push(row);
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

      let astroids = this.state.days[i].length;
      let row = [today, astroids];
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

      if (this.state.days.length > this.state.max-1) {
        return (
          <div className="con">
          <div className="chart">
          <Card className="con">
          <h3> Today it is the {today}</h3>
          <h4> Welcome to the Asteroid Finder!</h4>
          <h4> Here you will be able to see specific data about asteroids over a certain timeline.</h4>
          </Card>

          <Card className="con">
          <h3> The total percentage of Hazardous asteroids for the last {this.state.max} days </h3>
          <Chart
            chartType="PieChart"
            options={{title: "Planet", hAxis: {title: "Asteroid Count"}, vAxis: {title: "Asteroid"}}}
            rows={this._getAstroidPieRow()}
            columns={[{label: "True", type: "string"}, {label: "False", type: "number"}]}
            graph_id={"asteroids-planet"}
            width="100%"
            height="400px"
            legend_toggle
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
            legend_toggle
            />
            </Card>
          </div>
          <div className="chart">
          <Card className="con">
          <h3>The amount of Asteroids that may have been potentially hazardous to the earth for the past {this.state.max} days.</h3>
          <Chart
            chartType="BarChart"
            options={{title: "Date", hAxis: {title: "Hazardous asteroids"}, vAxis: {title: "Days"}}}
            rows={this._getAstroidBarRow()}
            columns={[{label: "Day", type: "string"}, {label: "Hazardous asteroids", type: "number"}]}
            graph_id={"asteroids-hazardous"}
            width="100%"
            height="400px"
            legend_toggle
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
