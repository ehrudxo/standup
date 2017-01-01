/**
 * Created by keen on 2016. 12. 26..
 */
import React,{Component} from 'react'
import './GroupAdd.css'
import { browserHistory } from 'react-router'
import Dropzone from 'react-dropzone'
import imageUpload from './FileUtil'
import dao from './FirebaseDao'

class GroupAdd extends Component{
  constructor(props){
    super(props);
    this.state={
      groupImage : undefined,
      isSpin : false,
      groupName : ""
    }
  }
  onDrop (acceptedFiles, rejectedFiles) {
    console.log(acceptedFiles, rejectedFiles);
    if(rejectedFiles&& rejectedFiles.length>0)
      alert(rejectedFiles[0].name  +" 파일은 이미지가 아닙니다 ");

    if(acceptedFiles && acceptedFiles.length>0){
      this.setState({
        isSpin: true
      });
      imageUpload(acceptedFiles, 1, (downloadUrl)=>{
        this.setState({
          groupImage:downloadUrl,
          isSpin: false
        });
      });
    }else{
      this.setState({
        isSpin: false
      });
    }
  }
  submit (){
    let key = dao.addGroupTx({
      name : this.state.groupName,
      logoUrl : this.state.groupImage,
      owner : dao.getUser()
    });
    browserHistory.push('/groups/'+ key);
  }
  render(){
    let add_group_style={
      width : window.screen.width -10
    }

    return(
      <div className="group-add" style={add_group_style}>
        <i onClick={browserHistory.goBack} className="fa fa-window-close float-right padding-top fa-lg green" ></i>
        <br/>
        <div className="innerEdit group-add-title "
             contentEditable="true"
             placeholder="클릭해서 그룹명을 입력하세요"
             dangerouslySetInnerHTML={{__html: this.state.groupName}}
             ></div>
        {this.state.groupImage &&
          <img src={this.state.groupImage} className="drop-file" alt={this.state.groupName}/>
        }
        {this.state.isSpin &&
        <i className="fa fa-spinner fa-2x green" ></i>
        }
        {!this.state.groupImage && !this.state.isSpin &&
          <Dropzone onDrop={(acceptedFiles, rejectedFiles)=>this.onDrop(acceptedFiles, rejectedFiles)} accept="image/*" className="drop-file padding-top">
            <div>파일을 드래그앤 드롭 하거나 클릭해서 선택하세요</div>
          </Dropzone>
        }
        <button onClick={()=>this.onSubmit()}>새 그룹 생성</button>
      </div>
    )
  }
}

export default GroupAdd