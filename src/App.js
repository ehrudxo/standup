import React, { Component } from 'react';
import logo from './img/stand_up_logo.png';
import './App.css';
import Editor from './Editor'

class App extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    console.log(this,e);
  }
  isAnonymous(){
    return true;
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Editor {...this}/>
      </div>
    );
  }
}

export default App;
