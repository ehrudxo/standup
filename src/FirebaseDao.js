import firebase from 'firebase';
import firebaseui from 'firebaseui';

/*
*  initializeFirebaseApp
*/
function _getUserKeyFromEmail( email ){
  return new Promise((resolve,reject)=>{
    firebase.database().ref('/users').on('value',(snapshot)=>{
      let users = snapshot.val();
      let hasUser = false;
      for(let key in users){
        if(users[key].email === email) {
          hasUser = true;
          // console.log(key, users[key]);
          resolve( Object.assign({key:key},users[key]) );
          break;
        }
      }
      if(!hasUser)reject();
    });
  });
}
function _validEntry(entry){
  return new Promise((resolve,reject)=>{
    firebase.database().ref(entry).once('value',(snapshot)=>{
      if(!snapshot.val())resolve(false);
      else resolve(true);
    },(error)=>{
      reject(error);
    })
  });
}
export default class FirebaseDao {
  constructor(config){
    if(firebase.apps&&firebase.apps.length>0){
      this.firebaseApp = firebase.apps[0];
    }else{
      this.firebaseApp = firebase.initializeApp(config);
    }
  }
  get currentUser(){
    return firebase.auth().currentUser;
  }
  getFirebaseApp(){
    return this.firebaseApp;
  }
  isValidGroup(groupName){
    return new Promise( (resolve, reject)=>{
      _validEntry('/groups/'+ groupName).then(function(isValid){
        resolve( isValid );
      }).catch(function(error){
        reject(error) ;
      });
    });
  }
  addUserTx(user){
    _getUserKeyFromEmail(user.email).then(function(){
      //do nothing
    }).catch( ()=> {
      return this.addUser(user);
    });
  }
  addUser(user){
    let update ={};
    update['/users/'+user.uid] = user;
    return firebase.database().ref().update(update);
  }
  
  checkGroupExists(groupName){
    return new Promise((resolve,reject)=>{
      firebase.database().ref('/groups').on('value',(snapshot)=>{
        let groups = snapshot.val();
        let isReal = false;
        for(let key in groups){
          if(groups[key].name === groupName) {
            isReal = true;
            resolve( groups[key] );
          }
        }
        if(!isReal)reject();
      });
    });
  }

  addGroup(postData){
    let owner = postData.owner;
    return new Promise((resolve,reject)=>{
      _getUserKeyFromEmail(owner.email).then((user)=>{
        try {
          let update = {};
          let key = firebase.database().ref().child('groups').push().key;
          postData.key=key;
          update['/groups/' + postData.name] = postData;
          update['/users/' + user.key + "/groups/" + postData.name] = postData;
          firebase.database().ref().update(update);
          resolve(postData.name);
        }catch(e){
          reject(e);
        }
      });
    });
  }
  insert(postData){
    return firebase.database().ref().child('posts').push(postData);
  }
  update(key,postData){
    //get group key first
    this.checkGroupExists(postData.groupName).then((group)=>{
      let groupKey = group?group.key:undefined;
      //get user mail seconds
      let uid = this.currentUser.uid;
      //then update
      var updates = {};
      postData.key = key;
      updates['/group-posts/' + groupKey+ "/"+key] = postData;
      updates['/user-posts/' + uid + "/"+key] = postData;
      return firebase.database().ref().update(updates);
    })
  }
  remove(key){
    return new Promise(resolve=>{
      firebase.database().ref('/group-posts/').child(key).remove();
      firebase.database().ref('/user-posts/' + this.currentUser().email ).child(key).remove();
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
  * Promise를 호출하게 되면 이벤트가 등록된 부분이 사라지게 된다.
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
  listGroupArticle(group){
    return new Promise((resolve,reject)=> {
      this.getGroup(group).once('value',(snapshot) => {
        let sn = snapshot.val();
        if (sn && sn.key) {
          firebase.database().ref('/group-posts/' + sn.key).on('value',(snapshot)=>{
            console.log(snapshot.val());
            resolve(snapshot.val());
          });
        }else{
          reject(new Error('no group'));
        }
      })
    });
  }
  getArticle(key){
    return new Promise(resolve=>{
      firebase.database().ref('/posts/'+key)
              .on('value',(articles)=>{
                resolve(articles);
              })
    });
  }
  get groupList(){
    return firebase.database().ref('/groups');
  }
  getGroup(name){
    return firebase.database().ref('/groups/'+name);
  }
  getUI(){
    return new firebaseui.auth.AuthUI(firebase.auth());
  }
  logout(){
    return firebase.auth().signOut();
  }
}
