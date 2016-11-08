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
    return new Promise(resolve=>{
      var updates = {};
      updates['/posts/' + key] = postData;
      updates['/user-posts/genji/' + key] = postData;
      firebase.database().ref().update(updates);
      resolve(updates);
    });
  }
  remove(key){
    return new Promise(resolve=>{
      firebase.database().ref('/posts/').child(key).remove();
      firebase.database().ref('/user-posts/genji/').child(key).remove();
      resolve(key);
    });
  }
  off(){
    return firebase.database().ref().off();
  }
  newKey(){
    return firebase.database().ref().child('posts').push().key;
  }
  list(pagesize){
    return new Promise(resolve=>{
      firebase.database().ref('/posts/')
              .orderByKey().limitToLast(pagesize)
              .on('value',(dataSnapshots)=>{
                resolve(dataSnapshots);
              })
    });
  }
  getArticle(key){
    return new Promise(resolve=>{
      firebase.database().ref( + key).on('value',(article)=>{
        resolve(article);
      });
    });
  }
}
