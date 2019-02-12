import { GET_USER_STORIES, GET_ALL_STORIES, DELETE_STORY, EDIT_STORY, PUBLISH_ARTICLE, CREATE_STORY } from "../actions/types";

const initState = []

export default function storyReducer(state = initState, action) {
  switch(action.type) {
    case GET_USER_STORIES: {
      return action.stories
    }

    case GET_ALL_STORIES: {
      return action.stories
    }

    case DELETE_STORY: return state

    case EDIT_STORY: return state;

    case PUBLISH_ARTICLE: return state;

    case CREATE_STORY: return state;

    default : return state;
  }
}