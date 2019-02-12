import { SIGN_UP, LOG_IN } from "./types";

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
                dispatch({
                  type: LOG_IN,
                  userData
                })     
                cb(true)
              })
          }
        })
    }
  }
};

export default authActions;