import React ,{Component} from 'react';
import firebase from 'firebase';
import './Profile.css';
import { Link } from 'react-router'
import PopCard from './PopCard'

class Profile extends Component{
  constructor(props){
    super(props);
    this.state={
      user : undefined,
      isPop: false
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
  popProfile(e){
    console.log(e);
    this.setState({isPop:!this.state.isPop})
  }
  render(){
    let user = this.state.user;
    if(user){
      return(
          <span>

            <div className="profile_img_wrap">
              <a href="#" onClick={(e)=>this.popProfile(e)}><img src={user.photoURL} alt="profiles" className="profile_img"/></a>
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
