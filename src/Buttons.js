/**
 * Created by keen on 2016. 12. 24..
 */
import Profile from './Profile'
import React, {Component} from 'react'
import './Buttons.css'
import GroupList from './GroupList'
import Editor from './Editor'
import {connect} from 'react-redux'

const GREY = '#AAA';
const PINK = '#FD478A';
const WHITE = 'white';

function _selectButtonStyle(button){
  switch(button){
    case 'groups':
      return {
        style_d: {color: GREY},
        style_g: {color: PINK},
        style_e: {color: GREY}
      }
    case 'edit' :
      return {
        style_d: {color: GREY},
        style_g: {color: GREY},
        style_e: {color: PINK}
      }
    default:
      return {
        style_d: {color: WHITE},
        style_g: {color: GREY},
        style_e: {color: GREY}
      }
  }
};
  
class Buttons extends Component {
  constructor(props){
    super(props);
    this.state = _selectButtonStyle('default');
  }
  selectButton(args){
    let s = Object.assign({selected:args},_selectButtonStyle(args));
    this.setState(s);
  }
  renderActionBar(){
    switch (this.state.selected){
      case 'groups':
        return <GroupList/>
      case 'edit' :
        return <Editor/>
      default :
        return null
    }
  }
  render() {
    const {logoUrl,groupName} = this.props;
    return (
      <div>

      <div className="buttons">
        <Profile/>
        <a onClick={()=>this.selectButton('edit')}><i className="fa fa-pencil-square fa-lg" style={this.state.style_e}></i></a>
        <a onClick={()=>this.selectButton('groups')}><i className="fa fa-handshake-o fa-lg" style={this.state.style_g}></i></a>
        <a onClick={()=>this.selectButton()}><i className="fa fa-window-minimize fa-lg" style={this.state.style_d}></i></a>
      </div>
      {this.renderActionBar()}
      {groupName && !this.state.selected&&
        <div style={{width:'100%',height:150,position:'relative'}}>
          <img src={logoUrl} alt={groupName} style={{width:'100%',height:150}}/>
          <div className="style_title" style={{width:"100%"}}>{groupName}</div>
        </div>
      }
      </div>
    )
  }
}
let mapStateToProps = (state, ownProps ) => {
  return {...state.default,...ownProps}
}
export default connect(mapStateToProps)(Buttons);