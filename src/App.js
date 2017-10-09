import React, { Component } from 'react';
import standardLogo from './img/stand_up_logo.png';
import './App.css';
import Buttons from './Buttons'
import CardList from './CardList'

/*
* App Component
*/
class App extends Component {
  render() {
    let groupName = this.props.params.groupName;
    let logo = standardLogo;
    let headerClass = "app-header";
    let headerStyle ={
      backgroundImage : 'url(' +logo+ ')'
    }
    return (
      <div className="app">
          <div className={headerClass} style={headerStyle}>
          </div>
        <Buttons groupName={groupName}/>
        {this.props.children}
        <CardList groupName={groupName}/>
      </div>
    );
  }
}
export default App;


