var React = require("react");

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CssBaseline from '@material-ui/core/CssBaseline';

class Notes extends React.Component {

  constructor() {
    super();
  }

  render() {
    return(
      <div className="fact alert alert-info">
        Notes
      </div>
    );
  }


}

module.exports = Notes;
