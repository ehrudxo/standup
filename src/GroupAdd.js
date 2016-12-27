/**
 * Created by keen on 2016. 12. 26..
 */
import React,{Component} from 'react'
import './GroupAdd.css'
import { browserHistory } from 'react-router'

class GroupAdd extends Component{
  render(){
    let add_group_style={
      width : window.screen.width -10
    }
    return(
      <div className="group_add" style={add_group_style}>
        그
        <i onClick={browserHistory.goBack} className="fa fa-window-close float-right padding-top fa-lg green"></i>
      </div>
    )
  }
}

export default GroupAdd