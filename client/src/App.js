import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Home from './components/home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Customer from "./components/customer";
import QualityTesting from "./components/quality-testing";
import MicroFinance from "./components/micro-finance";
import Farmer from "./components/farmer";
import Supplier from "./components/supplier";
import Product from "./components/product";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/farmer" component={Farmer} />
            <Route path="/customer" component={Customer} />
            <Route path="/supplier" component={Supplier} />
            <Route path="/quality-testing" component={QualityTesting} />
            <Route path="/micro-finance" component={MicroFinance} />
            <Route path="/home" component={Home} />
            <Route path="/product" component={Product} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
