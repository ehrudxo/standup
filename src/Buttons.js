/**
 * Created by keen on 2016. 12. 24..
 */
import Profile from './Profile'
import React, {Component} from 'react'
import './Buttons.css'
import GroupList from './GroupList'
import Editor from './Editor'
import {connect} from 'react-redux'
import {selectButton} from './actions/Button'

class Buttons extends Component {
  selectButton(args){
    const {dispatch} = this.props;
    dispatch(selectButton(args));
  }
  renderActionBar(selected){
    switch (selected){
      case 'groups':
        return <GroupList/>
      case 'edit' :
        return <Editor/>
      default :
        return null
    }
  }
  render() {
    const {logoUrl,groupName,selectedButton,defaultButtonStyle,groupButtonStyle,editButtonStyle} = this.props;
    return (
      <div>

      <div className="buttons">
        <Profile/>
        <a onClick={()=>this.selectButton('edit')}><i className="fa fa-pencil-square fa-lg" style={editButtonStyle}></i></a>
        <a onClick={()=>this.selectButton('groups')}><i className="fa fa-handshake-o fa-lg" style={groupButtonStyle}></i></a>
        <a onClick={()=>this.selectButton()}><i className="fa fa-window-minimize fa-lg" style={defaultButtonStyle}></i></a>
      </div>
      {this.renderActionBar(selectedButton)}
      {groupName && !selectedButton&&
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