import React, { Component } from 'react';
import logo from './img/stand_up_logo.png';
import './App.css';
import Editor from './Editor'
// import config from './config'
// console.log(config.apiKey); // 여기 주석은 일부러 남겨 두었습니다. 변화를 확인하세요.

class App extends Component {
  constructor(){
    super();
    this.submit = this.submit.bind(this);
    this.doodles = [];
  }
  submit(content){
    if(content){
      console.log(content);
    }
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
