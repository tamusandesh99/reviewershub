import {
  USER_POST_FAIL,
  USER_POST_SUCCESS,
  USER_POST_LOAD_FAIL,
  USER_POST_LOAD_SUCCESS,
  POSTS_LOAD_FAIL,
  POSTS_LOAD_SUCCESS,
  ADD_SAMPLE_POST,
  LOAD_MORE_POSTS,
  GET_SINGLE_POST_SUCCESS,
} from "../actions/types";

import image1 from '../assets/pictures/temp-logo.png'

const initialState = {
  username: "",
  user_posts: [],
  all_posts: [],
  single_post: [],
  sample_posts: [
    {
        id: 19,
        username: "sample_user",
        title: "This is sample post ",
        description: "This is where all the sample posts will appear.",
        images: [image1,],
        links: ["https://sandeshgurung.com","https://google.com"],
        likes: 37,
        comments: [],
        date: 12/19/2023
    },
  ],
};


export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_POST_SUCCESS:
      return {
        ...state,
        username: payload.username,
        user_posts: [...state.user_posts, payload],
      };
    case USER_POST_FAIL:
      return {
        ...state,
      };
    case USER_POST_LOAD_FAIL:
      return {
        ...state,
      };
    case POSTS_LOAD_FAIL:
      return {
        ...state,
        all_posts: payload,
      };
    case POSTS_LOAD_SUCCESS:
      return {
        ...state,
        all_posts: payload,
      };
    case GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        single_post: payload,
      };
    case ADD_SAMPLE_POST:
      return {
        ...state,
        sample_posts: [...state.sample_posts, payload],
      };

    case LOAD_MORE_POSTS:
      return {
        ...state,
        all_posts: [...state.all_posts, payload],
      };
    default:
      return state;
  }
}
