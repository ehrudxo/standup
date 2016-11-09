import React, { Component } from 'react'
import './Card.css'

export default class Card extends Component {
  constructor(){

  }
  render(){
    let cardInfo = this.props.cardInfo;
    return(
      <a className="card" href={cardInfo.url} target="_blank">
        <div className="card_image" >
          <img src={cardInfo.thumbnail_url} alt={cardInfo.title} className="card_img" style={{width:ocl.fixWidth,height:ocl.fixHeight}}/>
        </div>
        <div className="borderTop">
        <div className="card_text">
          <p className="card_title" style={{width:ocl.txtSize}}>{cardInfo.title}</p>
          <p className="card_desc" style={{width:ocl.txtSize}}>{cardInfo.desc}</p>
          <p className="card_provider" style={{width:ocl.txtSize}}>{cardInfo.provider_url}</p>
        </div>
        </div>
      </a>
    )
  }
}
