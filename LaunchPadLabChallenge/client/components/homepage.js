import React, { Component } from 'react';
import { fetchGitData, fetchCommitData, fetchVotes } from '../store';
import { connect } from 'react-redux';
// import { stat } from 'fs';

const frameworks = {
  react: "https://api.github.com/repos/facebook/react",
  angular: "https://api.github.com/repos/angular/angular.js",
  ember: "https://api.github.com/repos/emberjs/ember.js",
  vue: "https://api.github.com/repos/vuejs/vue"
}

class Homepage extends Component {

  constructor() {
    super();
    this.commitCountHelpFunc = this.commitCountHelpFunc.bind(this);
  };
  // constructor() {
  //   super();
  //   this.state = {
  //     reactData: {starCount: 0, issueCount: 0, weeklyCommitCount: 0, monthlyCommitCount: 0},
  //     angularData: {starCount: 0, issueCount: 0, weeklyCommitCount: 0, monthlyCommitCount: 0},
  //     emberData: {starCount: 0, issueCount: 0, weeklyCommitCount: 0, monthlyCommitCount: 0},
  //     vueData: {starCount: 0, issueCount: 0, weeklyCommitCount: 0, monthlyCommitCount: 0}
  //   };
  // }

  componentDidMount() {
    // Object.keys(frameworks).forEach((framework => {
    //   fetch(frameworks[framework])
    //   .then(res => res.json())
    //   .then(body => {
    //     this.setState((prev) => {
    //       prev[`${framework}Data`].starCount = body.stargazers_count
    //       prev[`${framework}Data`].issueCount = body.open_issues_count
    //       prev[`${framework}Data`].forkCount = body.forks
    //     })
    //     console.log('gets here', this.state)
    //   });
      // fetch(`${frameworks[framework]}/stats/commit_activity`)
      // .then(res => res.json())
      // .then(body => {
      //   this.setState((prev) => {
      //     prev[`${framework}Data`].weeklyCommitCount = body[body.length - 1].total
      //     prev[`${framework}Data`].monthlyCommitCount = body[body.length - 1].total + body[body.length - 2].total + body[body.length - 3].total + body[body.length - 4].total
      //   })
      // });
    // }))

    this.props.fetchGitData();
    this.props.fetchCommitData();
  }

  commitCountHelpFunc(time, data) {
    if (time === 'month') {
      return data[data.length - 1].total + data[data.length - 2].total + data[data.length - 3].total + data[data.length - 4].total
    } else {
      return data[data.length - 1].total
    }
  }

  render() {
    const gitData = this.props.gitData
    const commitData = this.props.commitData
    return (
      commitData.reactData.length ?
      <React.Fragment>
        <h1>Hi</h1>
        <table>
          <tbody>
            <tr>
              <td/>
              <td>React</td>
              <td>Angular</td>
              <td>Ember</td>
              <td>Vue</td>
            </tr>
            <tr>
              <td>Number of Stars</td>
              <td>{gitData.reactData.stargazers_count}</td>
              <td>{gitData.angularData.stargazers_count}</td>
              <td>{gitData.emberData.stargazers_count}</td>
              <td>{gitData.vueData.stargazers_count}</td>
            </tr>
            <tr>
              <td>Number of Forks</td>
              <td>{gitData.reactData.forks}</td>
              <td>{gitData.angularData.forks}</td>
              <td>{gitData.emberData.forks}</td>
              <td>{gitData.vueData.forks}</td>
            </tr>
            <tr>
              <td>Number of Commits From Past Week</td>
              <td>{this.commitCountHelpFunc('week', commitData.reactData)}</td>
              <td>{this.commitCountHelpFunc('week', commitData.angularData)}</td>
              <td>{this.commitCountHelpFunc('week', commitData.emberData)}</td>
              <td>{this.commitCountHelpFunc('week', commitData.vueData)}</td>
            </tr>
            <tr>
              <td>Number of Commits From Past Month</td>
              <td>{this.commitCountHelpFunc('month', commitData.reactData)}</td>
              <td>{this.commitCountHelpFunc('month', commitData.angularData)}</td>
              <td>{this.commitCountHelpFunc('month', commitData.emberData)}</td>
              <td>{this.commitCountHelpFunc('month', commitData.vueData)}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment> :
      <div>
        Not rendered
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    gitData: state.gitData,
    commitData: state.commitData
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchGitData: () => dispatch(fetchGitData()),
    fetchCommitData: () => dispatch(fetchCommitData()),
    fetchVotes: () => dispatch(fetchVotes())
  };
}

export default connect(mapState, mapDispatch)(Homepage);
