import firebase from 'firebase';
/*
*  initializeFirebaseApp
*/

export default class FirebaseDao {
  constructor(config){
    firebase.initializeApp(config);
    this.firebaseRef = firebase.database().ref();
  }
  post(postData){
    var newPostKey = this.firebaseRef.child('posts').push().key;
    return this.update(newPostKey,postData);
  }
  update(key,postData){
    var updates = {};
    updates['/posts/' + key] = postData;
    updates['/user-posts/genji/' + key] = postData;
    return this.firebaseRef.update(updates);
  }
  remove(key){
    return this.firebaseRef.child(key).remove();
  }
  off(){
    return this.firebaseRef.off();
  }
  getKey(){
    return this.firebaseRef.key;
  }
}
