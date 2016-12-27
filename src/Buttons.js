/**
 * Created by keen on 2016. 12. 24..
 */
import Profile from './Profile'
import React,{Component} from 'react'
import {Link} from 'react-router'
import './Buttons.css'

class Buttons extends Component{

    render(){
      // let selectedColor = {color:"#FD478A"};

      let style_e = {color:"#AAA"},
          style_g = {color:"#AAA"},
          pathname = this.props.pathname;
      if(pathname==="/edit"){
        style_e={color:"#FD478A"};
      }else{
        style_g={color:"#FD478A"};
      }
      return (
          <div className="buttons">
              <Profile/>
            <Link to="/edit"><i className="fa fa-pencil-square fa-2x" style={style_e}></i></Link>
            <Link to="/group"><i className="fa fa-heartbeat fa-2x" style={style_g}></i></Link>
          </div>
      )
    }
}
export default Buttons;