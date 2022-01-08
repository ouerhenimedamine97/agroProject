import React, { Component } from "react";
// import StructStorageContract from './contracts/StructStorage.json'
// import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Home from './components/home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
        {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div> */}
        <Router>
        <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/farmer" component={Farmer}/>
             <Route path="/customer" component={Customer}/>
             <Route path="/supplier" component={Supplier}/>
             <Route path="/quality-testing" component={QualityTesting}/>
             <Route path="/micro-finance" component={MicroFinance}/>
             <Route path="/home" component={Home} />
             <Route path="/product" component={Product}/>
        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
