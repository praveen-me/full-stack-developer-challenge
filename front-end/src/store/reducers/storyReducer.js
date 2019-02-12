import { GET_USER_STORIES, GET_ALL_STORIES } from "../actions/types";

const initState = []

export default function storyReducer(state = initState, action) {
  switch(action.type) {
    case GET_USER_STORIES: {
      return action.stories
    } 
    case GET_ALL_STORIES: {
      return action.stories
    }
    default : return state;
  }
}