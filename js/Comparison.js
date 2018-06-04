var React = require("react");
var DashCharts = require("./DashCharts");
var Chart = require("react-google-charts").Chart;

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

class Comparison extends React.Component {

  constructor() {
    super();
    this.state = {
      lookup0: [],
      lookup1: [],
      done: false
    }
  }

  componentWillMount() {

    this._fetchResponseNeoLookup0(2207398);
    this._fetchResponseNeoLookup1(2101955);

  }

  _fetchResponseNeoLookup0(key) {
    jQuery.ajax({
      method: "GET",
      url: "https://api.nasa.gov/neo/rest/v1/neo/" + key + "?api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
      success: (answers) => {

        this.setState({lookup0: answers});

      }
    });

  }

  _fetchResponseNeoLookup1(key) {
    jQuery.ajax({
      method: "GET",
      url: "https://api.nasa.gov/neo/rest/v1/neo/" + key + "?api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
      success: (answers) => {

        this.setState({lookup1: answers});
        console.log(this.state.lookup1);
        this.setState({done: true});
        console.log(this.state.lookup1.is_potentially_hazardous_asteroid);
      }

    });
  }

  _hazardous1() {
    if (this.state.lookup1.is_potentially_hazardous_asteroid === true) {
      return "Yes"
    } else {
      return "No"
    }
  }

  _hazardous0() {
    if (this.state.lookup0.is_potentially_hazardous_asteroid === true) {
      return "Yes"
    } else {
      return "No"
    }
  }

  _getAstroidPieRow(num) {
    var rows = [];
    let planets = [];
    let planetCount = [];
    if (num === 0) {
      for (var i = 0; i < this.state.lookup0.close_approach_data.length; i++) {

        if (planets.indexOf(this.state.lookup0.close_approach_data[i].orbiting_body) < 0) {
          planetCount.push(1);
          planets.push(this.state.lookup0.close_approach_data[i].orbiting_body)
        } else {
          var index = planets.indexOf(this.state.lookup0.close_approach_data[i].orbiting_body);
          planetCount[index]++;

        }

      }
    } else if (num === 1) {
      for (var i = 0; i < this.state.lookup1.close_approach_data.length; i++) {

        if (planets.indexOf(this.state.lookup1.close_approach_data[i].orbiting_body) < 0) {
          planetCount.push(1);
          planets.push(this.state.lookup1.close_approach_data[i].orbiting_body)
        } else {
          var index = planets.indexOf(this.state.lookup1.close_approach_data[i].orbiting_body);
          planetCount[index]++;

        }

      }
    }

    for (var i = 0; i < planets.length; i++) {
      let row = [
        planets[i], planetCount[i]
      ];
      rows.push(row);
    }

    return rows;

  }

  render() {
    if (this.state.done === true) {
      return (<div>

        <Card className="con">
          <h3>
            We are comparing Asteroid {this.state.lookup0.name}
            and Asteroid {this.state.lookup1.name}
          </h3>

        </Card>

        <Card className="con">

          <h4>
            We are firstly comparing the orbit pattern for {this.state.lookup0.name}
            and {this.state.lookup1.name}
          </h4>
          <div className="con2">

            <Chart chartType="PieChart" options={{
                title: "Asteroid",
                hAxis: {
                  title: "Asteroid Count"
                },
                vAxis: {
                  title: "Asteroid"
                }
              }} rows={this._getAstroidPieRow(0)} columns={[
                {
                  label: "Asteroid",
                  type: "string"
                }, {
                  label: "Planet",
                  type: "number"
                }
              ]} graph_id={"asteroid0"} width="100%" height="400px" legend_toggle="legend_toggle"/>
          </div>

          <div className="con2">
            <Chart chartType="PieChart" options={{
                title: "Asteroid",
                hAxis: {
                  title: "Asteroid Count"
                },
                vAxis: {
                  title: "Asteroid"
                }
              }} rows={this._getAstroidPieRow(1)} columns={[
                {
                  label: "Asteroid",
                  type: "string"
                }, {
                  label: "Planet",
                  type: "number"
                }
              ]} graph_id={"asteroid1"} width="100%" height="400px" legend_toggle="legend_toggle"/>
          </div>

          <div className="con2">
            <p>Is {this.state.lookup0.name}
              hazardous? {this._hazardous0()}</p>
          </div>

          <div className="con2">
            <p>Is {this.state.lookup1.name}
              hazardous? {this._hazardous1()}</p>
          </div>

          <div className="con2">
            <p>{this.state.lookup0.name}
              absolute magnitude is {this.state.lookup0.absolute_magnitude_h}
            </p>
          </div>

          <div className="con2">
            <p>{this.state.lookup1.name}
              absolute magnitude is {this.state.lookup1.absolute_magnitude_h}
            </p>
          </div>


        </Card>
      </div>);
    } else {
      return null;
    }
  }

}

module.exports = Comparison;
