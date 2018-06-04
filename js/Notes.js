var React = require("react");

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import CssBaseline from '@material-ui/core/CssBaseline';

class Notes extends React.Component {

  constructor() {
    super();
    this.state = {
      forms:[
        {title: "Hazardous Asteroids", note: "The amount of hazardous asteroids have been increasing the last few days.", key:0},
        {title: "Asteroids", note: "Asteroids are a interesting thing", key:1},
        {title: "Dinosaurs", note: "Can you believe a astroid killed the dinosaurs!", key:2}
      ],
      test:""
    }
  }

    _addNote(){
      var texts = [];
    // var texts = this.state.forms;
    // var length = texts.length;
    var text = $("input:text").val();
      var title = "test";
    texts.push("title": title, "name": text, "key": length);
    this.setState({forms: texts});
  }

_markupNotes(){
  return this.state.forms.map((form) => {
      return(
        <Card className="note">
          <h4>{form.title}</h4>
          <p>{form.note}</p>
        </Card>

      );


  });
}


  render() {

    return(
      <div>
        {this._markupNotes()}
        <div className="notesInput">
        <Card className="con">

        <h3>
        Keep notes while tracking Asteroids
        </h3>
        <div className="text">
        <p>Title:</p>
        <input type="text" name="title" className="title">
        </input>
        <p>Note</p>
        <input type="text" name="input" className="textinput">
        </input>
        </div>

        <div className="buttonCon">
        <Button variant="raised" color="primary" className="saveNotes" onClick={this._addNote}>
        Save Note
      </Button>
      </div>
        </Card>
        </div>
      </div>
    );
  }


}

module.exports = Notes;
