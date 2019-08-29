import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import 'babel-polyfill';

const frameworks = {
  react: "https://api.github.com/repos/facebook/react",
  angular: "https://api.github.com/repos/angular/angular.js",
  ember: "https://api.github.com/repos/emberjs/ember.js",
  vue: "https://api.github.com/repos/vuejs/vue"
};

const initialState = {
  gitData: {
    reactData: {},
    angularData: {},
    emberData: {},
    vueData: {}
  },
  commitData: {
    reactData: {},
    angularData: {},
    emberData: {},
    vueData: {}
  },
  votes: {
    react: 0,
    angular: 0,
    ember: 0,
    vue: 0
  }
};

const GET_GIT_DATA = 'GET_GIT_DATA';
const GET_COMMIT_DATA = 'GET_COMMIT_DATA';
const GET_VOTES = 'GET_VOTES';

export const getGitData = (reactGitData, angularGitData, emberGitData, vueGitData) => {
  return {
    type: GET_GIT_DATA,
    reactGitData, angularGitData, emberGitData, vueGitData
  };
};

export const getCommitData = (reactCommitData, angularCommitData, emberCommitData, vueCommitData) => {
  return {
    type: GET_COMMIT_DATA,
    reactCommitData, angularCommitData, emberCommitData, vueCommitData
  };
};

export const getVotes = (votes) => {
  return {
    type: GET_VOTES,
    votes
  };
};

export const fetchGitData = () => {
  return async (dispatch) => {
    try {
      const reactGitData = await fetch(frameworks.react)
        .then(res => res.json())
      const angularGitData = await fetch(frameworks.angular)
        .then(res => res.json())
      const emberGitData = await fetch(frameworks.ember)
        .then(res => res.json())
      const vueGitData = await fetch(frameworks.vue)
        .then(res => res.json())
      dispatch(getGitData(reactGitData, angularGitData, emberGitData, vueGitData))
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchCommitData = () => {
  return async (dispatch) => {
    try {
      const reactCommitData = await fetch(`${frameworks.react}/stats/commit_activity`)
        .then(res => res.json())
      const angularCommitData = await fetch(`${frameworks.angular}/stats/commit_activity`)
        .then(res => res.json())
      const emberCommitData = await fetch(`${frameworks.ember}/stats/commit_activity`)
        .then(res => res.json())
      const vueCommitData = await fetch(`${frameworks.vue}/stats/commit_activity`)
        .then(res => res.json())
      dispatch(getCommitData(reactCommitData, angularCommitData, emberCommitData, vueCommitData))
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchVotes = () => {
  return async (dispatch) => {
    try {
      await fetch('/api/votes')
        .then(res => res.json())
        .then(data => {
          dispatch(getVotes(data));
        });
    } catch (err) {
      console.error(err);
    }
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GIT_DATA:
      return {...state, gitData: {
        reactData: action.reactGitData,
        angularData: action.angularGitData,
        emberData: action.emberGitData,
        vueData: action.vueGitData,
      }};
    case GET_COMMIT_DATA:
      return {...state, commitData: {
        reactData: action.reactCommitData,
        angularData: action.angularCommitData,
        emberData: action.emberCommitData,
        vueData: action.vueCommitData,
      }};
    case GET_VOTES:
      return {...state, votes: action.votes};
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;

