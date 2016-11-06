import firebase from 'firebase';
/*
*  initializeFirebaseApp
*/

export default class FirebaseDao {
  constructor(config){
    firebase.initializeApp(config);
  }
  insert(postData){
    return firebase.database().ref().child('posts').push(postData);
  }
  update(key,postData){
    var updates = {};
    updates['/posts/' + key] = postData;
    updates['/user-posts/genji/' + key] = postData;
    return firebase.database().ref().update(updates);
  }
  remove(key){
    firebase.database().ref('/posts/').child(key).remove();
    return firebase.database().ref('/user-posts/genji/').child(key).remove();
  }
  off(){
    return firebase.database().ref().off();
  }
  newKey(){
    return firebase.database().ref().child('posts').push().key;
  }
  list(pagesize){
    return firebase.database().ref('/posts/')
            .orderByKey().limitToLast(pagesize);
  }
  getArticle(key){
    return firebase.database().ref( + key);
  }
}
