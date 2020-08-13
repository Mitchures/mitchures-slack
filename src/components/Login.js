import React from 'react';
import './Login.css';
import {auth, provider} from "../firebase";
import {useStateValue} from "../context/StateProvider";
import {actionTypes} from "../context/reducer";

function Login() {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/1280px-Slack_Technologies_Logo.svg.png"
          alt="Slack"
        />
        <h2>Sign in to Slack</h2>
        <button
          onClick={signIn}
          className="login__google"
        >
          <div className="login__googleIconWrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google"/>
          </div>
          <p><strong>Sign In with Google</strong></p>
        </button>
      </div>
    </div>
  );
}

export default Login;