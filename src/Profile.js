/*global firebase*/
import React ,{Component} from 'react';
import './Profile.css';
import { Link } from 'react-router'
import PopCard from './PopCard'

class Profile extends Component{
  constructor(props){
    super(props);
    this.state={
      user : undefined,
      isPop:false
    }
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.setState({user:user});
      }else{
        this.setState({user:undefined});
      }
    });
  }
  popProfile(){
    let isPop = !this.state.isPop;
    this.setState({isPop:isPop})
  }
  render(){
    let user = this.state.user;
    if(user){
      return(
          <span>
            <div className="profile_name">
              <a href="#" onClick={()=>this.popProfile()}>{user.displayName}</a>
            </div>
            <div className="profile_img_wrap">
              <img src={user.photoURL} alt="profiles" className="profile_img"/>
            </div>
            <PopCard isPop={this.state.isPop}/>
          </span>
      )
    }else{
      return (<div className="profile_name"><Link to="/login">로그인</Link></div>)
    }
  }
}

export default Profile;
