import React, { Component } from 'react'
import firebase from 'firebase';
import './Editor.css'
import Card from './Card'
import getEmbedly from './EmbedlyDao'
import {updateArticle} from './actions/Article'
import { connect } from 'react-redux'

class Editor extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.detectURL = this.detectURL.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getForcedState  = this.getForcedState.bind(this);
    this.state={
      embedlyUrl : undefined,
      content : undefined,
      cardInfo : undefined
    };
  }
  getForcedState(embedlyUrl,content){
    return new Promise(resolve=>{
      if(embedlyUrl){
        getEmbedly(embedlyUrl).then((response)=>{
          let cardInfo = Object.assign({},response.data);
          resolve({
            embedlyUrl : embedlyUrl,
            content : content,
            cardInfo : cardInfo
          });
        }).catch((error)=>{
          resolve({
            embedlyUrl : undefined,
            content : undefined,
            cardInfo : undefined
          });
        });
      }else{
        resolve({
          content : content
        });
      }
    })
  }
  onPaste(event){
    event.clipboardData.items[0].getAsString(text=>{
      let checkText = this.detectURL(text);
      if(checkText){
        this.getForcedState(checkText).then((obj)=>{
          this.setState(obj);
        });
      }
    })
  }
  editorChange(event){
    let checkText = this.detectURL(event.currentTarget.textContent);
    if(!this.state.embedlyUrl&&
        (event.keyCode===32||event.keyCode===13)&&
        checkText){
      this.getForcedState(checkText,event.currentTarget.textContent)
          .then((obj)=>{
            this.setState(obj);
          });
    }else{
      this.getForcedState(undefined,event.currentTarget.textContent)
          .then((obj)=>{
            this.setState(obj);
          });
    }
  }
  getArticle(){
    let article = {};
    let user = firebase.auth().currentUser;
    article.user = {
        email : user.email,
        displayName : user.displayName,
        uid : user.uid
    };
    article.content = this.state.content;
    if(this.state.embedlyUrl){
      article.cardInfo = this.state.cardInfo;
    }
    return article;
  }
  hasValue(value){
    if((value && (typeof value) === "string"))
      return (!value)?false:(value.trim()===""?false:true);
    else return false;
  }
  handleSubmit(e){
    e.preventDefault();
    let article = this.getArticle();
    if(article){
      const {dispatch} = this.props;
      dispatch(updateArticle({...article,groupName:this.props.groupName}));
      this.forceUpdate();
    }
    this.setState({
      embedlyUrl : undefined,
      content : undefined,
      cardInfo : undefined
    });
  }
  detectURL(text){
    var urls = text.match(/(https?:\/\/[^\s]+)/g)||text.match(/(www.[^\s]+)/g);
    if(urls && urls.length>0) return urls[0];
    else return undefined;
  }
  render() {
    return (
      <div className="wrapEditor">
        <div className="textEditor">
          <div className="innerEdit"
            contentEditable="true"
            placeholder="글쓰기..."
            onPaste={this.onPaste}
            onKeyUp={this.editorChange}
            dangerouslySetInnerHTML={{__html: this.state.content}}></div>
            <Card cardInfo={this.state.cardInfo}/>
        </div>
        <div className="actionBar">
          <button className="upload"
            disabled={!this.hasValue(this.state.content)}
            onClick={this.handleSubmit}><span>스탠드업!</span></button>
        </div>
      </div>
    );
  }
}
let mapStateToProps = (state, ownProps ) => {
  return {groupName: state.default.groupName}
}
export default connect(mapStateToProps)(Editor);


