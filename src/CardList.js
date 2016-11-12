import React, { Component } from 'react';
import Card from './Card'
import './CardList.css'

export default class CardList extends Component {
  createCard(item,index){
    return(<li className="list_row" key={item.key}>
              <pre className="common_margin grey_text">{item.content}</pre>
              {
                (item.cardInfo)?<Card cardInfo={item.cardInfo}/>:""
              }
            </li>);
  }
  render() {
    return <ul>{ this.props.articles.map(this.createCard) }</ul>;
  }
}
