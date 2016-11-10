import React, { Component } from 'react'
import './Card.css'

export default class Card extends Component {
  constructor(){
    super();
  }
  render(){
    let cardInfo = this.props.cardInfo;
    return(
      <a className="card" href={cardInfo.url} target="_blank">
        <div className="card_image" >
          <img src={cardInfo.thumbnail_url} alt={cardInfo.title} className="card_img" style={{width:cardInfo.fixWidth,height:cardInfo.fixHeight}}/>
        </div>
        <div className="borderTop">
        <div className="card_text">
          <p className="card_title" style={{width:cardInfo.txtSize}}>{cardInfo.title}</p>
          <p className="card_desc" style={{width:cardInfo.txtSize}}>{cardInfo.desc}</p>
          <p className="card_provider" style={{width:cardInfo.txtSize}}>{cardInfo.provider_url}</p>
        </div>
        </div>
      </a>
    )
  }
}
