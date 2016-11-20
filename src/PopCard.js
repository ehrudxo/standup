/*global firebase*/
import React ,{Component} from 'react';
import './PopCard.css';
import {userArticles,loadArticles} from './actions/Article'
import {connect} from 'react-redux';

class PopCard extends Component{
  logout(){
    firebase.auth().signOut();
  }
  render(){
    const {dispatch} = this.props;
    if(this.props.isPop){
      return(
        <div className="card_pop">
          <div>
          <a href="#" onClick={()=>dispatch(userArticles())}>내 글만 보기</a>
          </div>
          <div>
          <a href="#" onClick={()=>dispatch(loadArticles())}>전체 글 보기</a>
          </div>
          <div>
            <a href="#" onClick={()=>this.logout()}>로그아웃</a>
          </div>
        </div>);
    }else{
      return <div/>
    }
  }
}
export default connect()(PopCard)
