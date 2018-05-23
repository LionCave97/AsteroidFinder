var React = require("react");
var DashCharts = require("./DashCharts");
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


class Dash extends React.Component {

  constructor() {
    super();
    this.state = {
      length : 0,
      data: [],
      lookup: [],
      browse: []


    }
  }

  componentWillMount() {

    var date = new Date();
    var month = date.getMonth() + 1;
    var today = date.getFullYear()+"-"+month+ "-"+date.getDate();

  //   console.log(today);
  // this._fetchResponseNeoFeed(today, today);
  // this._fetchResponseNeoLookup("3275510");
  // this._fetchResponseNeoBrowse();
}

  render() {

    return(

      <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}

      <DashCharts />



    </React.Fragment>

    );
  }

  // _fetchResponseNeoFeed(date1, date2) {
  //   jQuery.ajax({
  //     method: "GET",
  //     url: "https://api.nasa.gov/neo/rest/v1/feed?start_date="+ date1 +"&end_date="+ date2 +"&api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
  //     success: (answers) => {
  //       this.setState({length: answers.element_count});
  //       this.setState({data: answers.near_earth_objects["2018-05-15"]});
  //       console.log(answers.element_count);
  //       console.log(this.state.length);
  //       console.log(this.state.data);
  //       console.log(answers);
  //     }
  //   });
  // }
  //
  // _fetchResponseNeoLookup(key) {
  //   jQuery.ajax({
  //     method: "GET",
  //     url: "https://api.nasa.gov/neo/rest/v1/neo/"+ key +"?api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
  //     success: (answers) => {
  //       console.log(answers);
  //       this.setState({lookup: answers});
  //
  //     }
  //   });
  // }
  //
  // _fetchResponseNeoBrowse() {
  //   jQuery.ajax({
  //     method: "GET",
  //     url: "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
  //     success: (answers) => {
  //       console.log(answers);
  //       this.setState({browse: answers.near_earth_objects});
  //     }
  //   });
  // }
  //
  // _markupNeo() {
  //
  //
  //   return (
  //     <div className="data">
  //     <h4> There is {this.state.length} Asteroids around the earth Today. </h4>
  //     <br />
  //
  //
  //     <h4>Lookup:  </h4>
  //     <p>Name: {this.state.lookup.name},  ID: {this.state.lookup.neo_reference_id}</p>
  //
  //     <h4>Browse:  </h4>
  //     <p>Amount: {this.state.browse.length}</p>
  //
  //
  //     </div>
  //   );
  // }

}

module.exports = Dash;
