import firebase from 'firebase';
import firebaseui from 'firebaseui';

/*
*  initializeFirebaseApp
*/

export default class FirebaseDao {
  constructor(config){
    if(firebase.apps&&firebase.apps.length>0){
      this.firebaseApp = firebase.apps[0];
    }else{
      this.firebaseApp = firebase.initializeApp(config);
    }
  }
  getCurrentUser(){
    return firebase.auth().currentUser;
  }
  getFirebaseApp(){
    return this.firebaseApp;
  }
  addUser(user){
    let update ={};
    let key = firebase.database().ref().child('users').push().key;
    update['/users/'+key] = user;
    return firebase.database().ref().update(update);

  }
  getUserKeyFromEmail( email ){
    return new Promise((resolve,reject)=>{
      firebase.database().ref('/users').on('value',(snapshot)=>{
        let users = snapshot.val();
        let hasUser = false;
        for(let key in users){
          if(users[key].email === email) {
            hasUser = true;
            resolve( users[key] );
          }
        }
        if(!hasUser)reject();
      });
    });

  }
  addGroupTx(postData){
    //make group
    //user group mapping(if user does not exists, then create user ) - tx

  }
  addGroup(postData){
    var update ={};
    let key = firebase.database().ref().child('groups').push().key;
    update['/groups/'+ key] = postData;
    firebase.database().ref().update(update);
    return key;
  }
  addUserGroup(user,postData){
    return firebase.database().ref().child('/users/'+user.key).child("groups").push(postData);
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
  /**
  * Promise를 호출하게 되면 이벤트가 등록된 부분이 사라기제 된다.
  */
  list(pagesize,callback){
    // return new Promise(resolve=>{
      firebase.database().ref('posts')
              .orderByKey().limitToLast(pagesize)
              .on('value',(articles)=>{
                callback(articles);
              })
    // });
  }
  getArticle(key){
    return new Promise(resolve=>{
      firebase.database().ref('/posts/'+key)
              .on('value',(articles)=>{
                resolve(articles);
              })
    });
  }
  getUI(){
    return new firebaseui.auth.AuthUI(firebase.auth());
  }
  
  logout(){
    return firebase.auth().signOut();
  }
}
