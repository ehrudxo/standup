/**
 * Created by keen on 2016. 12. 30..
 */
import firebase from 'firebase'

export default function fileupload(files,size, callback){
  if(size && files.length!==size){
    if(size===1)alert("file은 하나만 업로드 가능합니다");
    else alert("지정된 파일 갯수랑 같지 않습니다.")
    return;
  }
  files.forEach(function(file){
    let ext = file.name.split('.').pop();
    let metadata = {};
    if( ext === 'jpg' ) metadata.contentType = 'image/jpeg';
    if( ext === 'png' ) metadata.contentType = 'image/png';
    if( ext === 'gif' ) metadata.contentType = 'image/gif';

    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = firebase.storage().ref().child('images/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default :
            //do nothing
        }
      }, function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
            console.log("unauthorized user");
            break;
          case 'storage/canceled':
            console.log("user cancel!");
            break;
          case 'storage/unknown':
            console.log("unexpected error")
            break;
          default:
            //do nothing
        }
      }, function() {
        callback(uploadTask.snapshot.downloadURL);
      });
  })

}


