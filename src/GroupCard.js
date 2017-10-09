/**
 * Created by keen on 2016. 12. 25..
 */
import React,{Component} from 'react'
import './GroupCard.css'
import { browserHistory } from 'react-router'
import {groupSelect} from './actions/Group'
import { connect } from 'react-redux'

class GroupCard extends Component{
  changeGroup(groupName){
    const {dispatch} = this.props;
    dispatch(groupSelect(groupName));
    browserHistory.push('/groups/'+groupName);
  }
  render(){
    return(
     <div className="style_bg">
       <img src={this.props.imageUrl} className="style_img"  alt={this.props.title}/>
       <div className="style_title" style={{width:window.screen.width}}>
         &nbsp;{this.props.title}
         <button className="style_chk" onClick={()=>this.changeGroup(this.props.title)}>
           <i className="fa fa-check">선택</i>
         </button>
       </div>
     </div>
   )
  }
}
let mapStateToProps = (state, ownProps ) => {
  return {...state.default,...ownProps}
}
export default connect(mapStateToProps)(GroupCard);


