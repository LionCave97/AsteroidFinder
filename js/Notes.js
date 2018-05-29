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
      form:"This is a form for your Asteroids"
    }
  }

  render() {
    return(
      <div>
        <Card className="con">

        <h3>
        Enjoy making a note
        </h3>
        <div className="note">

        <TextField
          id="multiline-static"
          label=""
          multiline
          rows="4"
          value={this.state.form}
          className="note"
          margin="normal"
        />
        </div>

        <div className="buttonCon">
        <Button variant="raised" color="primary" className="saveNotes">
        Save Notes
      </Button>
      </div>
        </Card>
      </div>
    );
  }


}

module.exports = Notes;
