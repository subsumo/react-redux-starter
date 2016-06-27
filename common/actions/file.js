import CordovaPromiseFS as 'cordova-promise-fs';

var fs = CordovaPromiseFS({
  persistent: true, // or false
  storageSize: 20*1024*1024, // storage size in bytes, default 20MB 
  concurrency: 3 // how many concurrent uploads/downloads?
  Promise: require('promiscuous') // Your favorite Promise/A+ library! 
});

export const REQUEST_FILE = 'REQUEST_FILE'
export const REQUEST_FILE = 'REQUEST_FILE'
export const RECEIVE_FILE = 'RECEIVE_POSTS'

function fileRequest(src) {
  return {
    type: REQUEST_FILE,
    src
  }
}

function fileReceive(src, json) {
  return {
    type: RECEIVE_FILE,
    src
  }
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}