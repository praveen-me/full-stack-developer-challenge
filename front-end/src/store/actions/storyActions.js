import {CREATE_STORY, GET_USER_STORIES} from './types';
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
      fetch(`${URI}/users/${id}/stories`)
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
  }
}

export default storyActions;