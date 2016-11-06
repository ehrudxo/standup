import React, { Component } from 'react';
import logo from './img/stand_up_logo.png';
import './App.css';
import Editor from './Editor'
import FirebaseDao from './FirebaseDao'
import config from './config'

/*
* App Component
*/
class App extends Component {
  constructor(){
    super();
    this.dao = new FirebaseDao(config);
    this.submit = this.submit.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.state = {
      articles:[]
    }
  }
  submit(article){
    if(article){
      let key = this.dao.newKey();
      let updated = this.dao.update( key, article );
      return updated;
    }
  }
  isAnonymous(){
    return true;
  }
  getArticles(){
    let lis = [];
    for(let i=0;i<this.state.articles.length;i++){
      lis.push(<li key={this.state.articles[i].key}>{this.state.articles[i].content}</li>);
    }
    return lis;
  }
  componentWillMount() {
    this.dao.list(25).on('value',(dataSnapshots)=>{
      var items = [];
      dataSnapshots.forEach(function(dataSnapshot){
        var item = dataSnapshot.val();
        item['key'] = dataSnapshot.key;
        console.log(dataSnapshot.val());
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
        <Editor handleSubmit={this.submit} isAnonymous={this.isAnonymous}/>
        <ul>
        {this.getArticles()}
        </ul>
      </div>
    );
  }
}

export default App;
