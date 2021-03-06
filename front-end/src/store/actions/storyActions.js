import {CREATE_STORY, GET_USER_STORIES, DELETE_STORY, GET_ALL_STORIES, EDIT_STORY, CLAPPED_STORY} from './types';
import store from './../store';
const URI = 'http://localhost:3001/api';


const storyActions = {
  token: () => localStorage.getItem('token'),
  addStory(storyData, cb) {
    return dispatch => {
      fetch(`${URI}/users/${storyData.userId}/stories`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${this.token()}`
        },
        body: JSON.stringify(storyData)
      })
        .then(res => {
          if(res.status === 201) {
              dispatch({
                type: CREATE_STORY
              })     
              cb(true)
          }
        })
    }
  },
  getUserStories(id, cb) {
    return dispatch => {
      fetch(`${URI}/users/${id}/stories`, {
        headers: {
          'Authorization': `Bearer ${this.token()}`
        }
      })
        .then(res => {
          if(res.status === 302) {
            res.json()
            .then(data => {
              console.log(data, 'user stories')
              dispatch({
                type: GET_USER_STORIES,
                stories: data.stories
              })     
              cb(true)
            })
          }
        })
    }  
  },
  deleteStory(id, cb) {
    return dispatch => fetch(`${URI}/users/${store.getState().auth.user._id}/stories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.token()}`
      }
    })
      .then(res => {
        if(res.status === 200) {
          res.json()
          .then(data => {
            console.log(data, 'user stories')
            dispatch({
              type: DELETE_STORY
            })     
            cb(true)
          })
        }
      })
  },
  getAllStories(cb) {
    return dispatch => {
      fetch(`${URI}/stories`, {
        headers : {
          'Authorization': `Bearer ${this.token()}`
        }
      })
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: GET_ALL_STORIES,
            stories: data.stories
          })
          cb(true)
        })
    } 
  },
  editStory({description, id, userId}, cb) {
    return dispatch => {
      fetch(`${URI}/users/${userId}/stories/${id}?mode=edit`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${this.token()}`
        },
        body: JSON.stringify({description})
      })
        .then(res => {
          if(res.status === 200) {
            dispatch({
              type: EDIT_STORY  
            })     
            cb(true)
          }
        })
    }
  },
  publishStory({userId, id}, cb) {
    return dispatch => {
      fetch(`${URI}/users/${userId}/stories/${id}?mode=publish`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${this.token()}`
        }
      })
        .then(res => {
          if(res.status === 200) {
            dispatch({
              type: EDIT_STORY  
            })     
            cb(true)
          }
        })
    }
  },
  upvote({id, userId}, cb) {
    console.log(id, userId, 'in actions')
    return dispatch => {
      fetch(`${URI}/stories/${id}?userClapped=${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token()}`
        }
      })
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: CLAPPED_STORY
          })
          cb(true)
        })
    }
  } 
}

export default storyActions;