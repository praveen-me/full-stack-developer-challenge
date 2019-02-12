import { SIGN_UP } from "./types";

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
  }
}

export default authActions;