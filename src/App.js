import React, { Component } from 'react';
import logo from './img/stand_up_logo.png';
import './App.css';
import Editor from './Editor'
import FirebaseDao from './FirebaseDao'
import config from './config'
import CardList from './CardList'
import load from 'little-loader';
import './external/firebase-ui/auth.js'
import './external/firebase-ui/auth.css'
/*
* App Component
*/
class App extends Component {
  constructor(){
    super();
    this.dao = new FirebaseDao(config);
    this.submit = this.submit.bind(this);
    this.state = {
      articles:[]
    }
  }
  submit(article){
    if(article){
      let key = this.dao.newKey();
      this.dao.update( key, article );
      this.forceUpdate();
    }
  }
  isAnonymous(){
    return true;
  }
  componentWillMount() {
    this.dao.list(25,(articles)=>{
      var items = [];
      articles.forEach(function(article){
        var item = article.val();
        item['key'] = article.key;
        items.push(item);
      })
      if(items && items.length>0){
        this.setState({
          articles: items.reverse()
        });
      }
    });
  }
  componentWillUnmount(){
    this.dao.off();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Editor submit={this.submit} isAnonymous={this.isAnonymous}/>
        <CardList articles={this.state.articles}/>
      </div>
    );
  }
}

export default App;
