import React, { Component } from 'react';
import logo from './img/stand_up_logo.png';
import './App.css';
import Buttons from './Buttons'
import CardList from './CardList'
/*
* App Component
*/
class App extends Component {
  render() {
    var headerStyle ={
      backgroundImage : 'url(' + logo+ ')'
    }

    return (
      <div className="App">
          <div className="App-header" style={headerStyle}>
          </div>
        <Buttons pathname={this.props.location.pathname}/>
        {this.props.children}
        <CardList/>
      </div>
    );
  }
}
export default App;
