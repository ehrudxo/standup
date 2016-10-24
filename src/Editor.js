import React, { Component } from 'react';
import './Editor.css';
import Profile from './Profile';

class Editor extends Component {
  constructor(props){
    super(props);
    this.detectURL = this.detectURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.getCard = this.getCard.bind(this);
    this.state ={
      embedlyUrl : undefined
    }
  }
  detectURL(text){
    return (text.match(/(https?:\/\/[^\s]+)/g)||text.match(/(www.[^\s]+)/g));
  }
  onPaste(event){
    event.clipboardData.items[0].getAsString(text=>{
      if(this.detectURL(text)){
        this.setState({embedlyUrl:text});
      }
    })
  }
  editorChange(event){
    let checkText = this.detectURL(event.currentTarget.textContent);
    if(!this.state.embedlyUrl&&
        (event.keyCode===32||event.keyCode===13)&&
        checkText){
      this.setState({embedlyUrl:checkText,content:this.state.content});
    }else{
      this.setState({content:event.currentTarget.textContent});
    }
  }
  getCard(embedlyUrl){
    if(embedlyUrl){
      return(
        <div>{embedlyUrl}</div>
      );
    }else{
      return(<div/>);
    }
  }
  handleSubmit(event){
    this.props.submit();
  }
  render() {
    return (
      <div className="wrapEditor">
        <Profile isAnonymous={this.props.isAnonymous}/>
        <div className="textEditor">
          <div className="innerEdit"
            contentEditable="true"
            placeholder="글쓰기..."
            onPaste={this.onPaste}
            onKeyUp={this.editorChange}></div>
          {this.getCard(this.state.embedlyUrl)}
        </div>
        <div className="actionBar">
          <button className="upload" onClick={this.handleSubmit}><span>스탠드업!</span></button>
        </div>
      </div>
    );
  }
}
export default Editor;
