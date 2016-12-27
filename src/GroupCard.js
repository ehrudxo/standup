/**
 * Created by keen on 2016. 12. 25..
 */
import React,{Component} from 'react'
import './GroupCard.css'

class GroupCard extends Component{
  render(){
    return(
     <div className="style_bg">
       <img src={this.props.imageUrl} className="style_img"  alt={this.props.title}/>
       <div className="style_title" style={{width:window.screen.width}}>
         &nbsp;{this.props.title}
         <button className="style_chk">
         <i className="fa fa-check">선택</i>
         </button>
       </div>
     </div>
   )
  }
}
export default GroupCard;
