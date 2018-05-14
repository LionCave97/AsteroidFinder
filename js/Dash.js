var React = require("react");

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
  this._fetchResponseNeoFeed("2018-05-15", "2018-05-15");
  this._fetchResponseNeoLookup("3275510");
  this._fetchResponseNeoBrowse();
}

  render() {
    return(
      <div className="con">
      <h3>Dash</h3>

      {this._markupNeo()}

      </div>
    );
  }

  _fetchResponseNeoFeed(date1, date2) {
    jQuery.ajax({
      method: "GET",
      url: "https://api.nasa.gov/neo/rest/v1/feed?start_date="+ date1 +"&end_date="+ date2 +"&api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
      success: (answers) => {
        this.setState({length: answers.element_count});
        this.setState({data: answers.near_earth_objects["2018-05-15"]});
        console.log(answers.element_count);
        console.log(this.state.length);
        console.log(this.state.data);
        console.log(answers);
      }
    });
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

  _fetchResponseNeoBrowse() {
    jQuery.ajax({
      method: "GET",
      url: "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=tqDzz0KlWtH1tGR1bj35NMM4fGmOmA8a0jqGqap7",
      success: (answers) => {
        console.log(answers);
        this.setState({browse: answers.near_earth_objects});
      }
    });
  }

  _markupNeo() {


    return (
      <div className="data">
      <h4> There are {this.state.length} Asteroids around the earth at this moment. </h4>

      <h4>Lookup:  </h4>
      <p>Name: {this.state.lookup.name},  ID: {this.state.lookup.neo_reference_id}</p>

      <h4>Browse:  </h4>
      <p>Amount: {this.state.browse.length}</p>


      </div>
    );
  }

}

$('.datepicker').datepicker({
  format: 'mm-dd-yyyy',
  startDate: '-3d'
});

module.exports = Dash;
