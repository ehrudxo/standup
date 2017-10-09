import React, {Component} from 'react'
import firebase from 'firebase'
import FirebaseDao from './FirebaseDao'
import config from './config'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'

class Login extends Component {
  constructor(props) {
    super(props);
    this.dao = new FirebaseDao(config);
    this.ui = this.dao.getUI();

  }

  componentDidMount() {
    const uiConfig = {
      callbacks: {
        signInSuccess: (currentUser, credential, redirectUrl)=> {
          this.dao.addUserTx({
            email : currentUser.email,
            displayName : currentUser.displayName,
            photoURL : currentUser.photoURL
          });
          browserHistory.push('/');
          return true;
        }
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    };
    this.ui.start('#firebaseui-auth', uiConfig);
  }

  componentWillUnmount() {
    this.ui.reset();
  }

  render() {
    return (
      <div id="firebaseui-auth"></div>
    );
  }
}
;

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    filter: ownProps.location.query.filter
  };
};

export default connect(mapStateToProps)(Login);
