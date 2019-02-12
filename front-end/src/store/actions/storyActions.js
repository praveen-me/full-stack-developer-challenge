import {CREATE_STORY, GET_USER_STORIES, DELETE_STORY, GET_ALL_STORIES, EDIT_STORY} from './types';
import store from './../store';
const URI = 'http://localhost:3001/api';


const storyActions = {
  addStory(storyData, cb) {
    return dispatch => {
      fetch(`${URI}/users/${storyData.userId}/stories`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${store.getState().auth.token}`
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
          'Authorization': `Bearer ${store.getState().auth.token}`
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
        'Authorization': `Bearer ${store.getState().auth.token}`
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
          'Authorization': `Bearer ${store.getState().auth.token}`
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
          'Authorization': `Bearer ${store.getState().auth.token}`
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
          'Authorization': `Bearer ${store.getState().auth.token}`
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
  } 
}

export default storyActions;