import {CREATE_STORY, GET_USER_STORIES, DELETE_STORY} from './types';
import store from './../store';
const URI = 'http://localhost:3001/api';

// TODO:
// 1 - Add story then data according to callback
// 2 - Handle action in reducer 

const storyActions = {
  addStory(storyData, cb) {
    return dispatch => {
      fetch(`${URI}/users/${storyData.userId}/stories`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
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
          'Authorization': `Bearer`
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
  }
}

export default storyActions;