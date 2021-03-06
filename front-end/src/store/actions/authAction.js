import { SIGN_UP, LOG_IN, LOG_OUT, IS_LOGGED_IN } from "./types";

const URI = 'http://localhost:3001/api';

const authActions = {
  signUp(userData, cb) {
    return dispatch => {
      fetch(`${URI}/signup`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(res => {
          if(res.status === 201) {
            res.json()
              .then(info => {
                dispatch({
                  type: SIGN_UP
                })     
              })
              cb(true)
          }
        })
    }
  },
  logIn(userData, cb) {
    return dispatch => {
      fetch(`${URI}/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(res => {
          if(res.status === 200) {
            res.json()
              .then(userData => {
                console.log(userData)
                localStorage.setItem('token', userData.token)
                
                dispatch({
                  type: LOG_IN,
                  userData
                })     
                cb(true)
              })
          }
        })
    }
  },
  logOut() {
    localStorage.removeItem('token');
    localStorage.setItem('lastLogoutTime', new Date())
    return {
      type: LOG_OUT
    } 
  },
  isLoggedIn(token) {
    return dispatch => {
      fetch(`${URI}/isLoggedIn/${token}`)
        .then(res => {
          if(res.status === 200) {
            res.json()
              .then(userData => {
                dispatch({
                  type: LOG_IN,
                  userData
                })
              })
          }
        })
    }
  }
};

export default authActions;