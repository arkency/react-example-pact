import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {parsed: false};
  }

  componentDidMount() {
    console.log("componentDidMount");
    return fetch(`http://localhost:8989/dogs`, {
      // Accept: 'application/json',
    }).then((response)=>{
      console.log("ASD");
      console.log(response.status);
      response.json().then((json)=>{
        console.log(json);
        this.setState({parsed: true});
      }).catch((error) => {
        console.log(error.message);
      });
    }).catch((error)=>{
      console.log(error.message);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {this.state.parsed ? "PARSED" : ""}
        </p>
      </div>
    );
  }
}

export default App;
