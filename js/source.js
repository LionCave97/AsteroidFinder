var React = require("react");
var ReactDOM = require("react-dom");
var BrowserRouter = require("react-router-dom").BrowserRouter;

var App = require("./App");

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.querySelector("#app"));
