var React = require("react");
var Link = require("react-router-dom").Link;
var Route = require("react-router-dom").Route;
var Switch = require("react-router-dom").Switch;

var Dash = require("./Dash");
var Comparison = require("./Comparison");
var Notes = require("./Notes");

class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="routingSystem">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" id="name" to="/">
                Asteroid Finder</Link>
            </div>
            <div className="collapse navbar-collapse" className="myNavbar">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/compare">Compare Asteroids</Link>
                </li>
                <li>
                  <Link to="/notes">Notes</Link>
                </li>
              </ul>

            </div>
          </div>

        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={Dash}/>
            <Route exact path="/compare" component={Comparison}/>
            <Route exact path="/Notes" component={Notes}/>
          </Switch>
        </main>
      </div>
    );
  }

}

module.exports = App;
