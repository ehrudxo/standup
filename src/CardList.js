import React, { Component } from 'react';
import Card from './Card'
import './CardList.css'
import {connect} from 'react-redux'
import {loadArticles} from './actions/Article'

class CardList extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadArticles());
  }
  createCard(item,index){
    return(<li className="list_row" key={item.key}>
              <pre className="common_margin grey_text">{item.content}</pre>
              {
                (item.cardInfo)?<Card cardInfo={item.cardInfo}/>:""
              }
            </li>);
  }
  render() {
    if(this.props.articles && this.props.articles.length>0)
      return <ul>{ this.props.articles.map(this.createCard) }</ul>;
    else return <div key="015b"/>
  }
}
export default connect(
  (state)=>({articles:state.default.articles})
)(CardList);
