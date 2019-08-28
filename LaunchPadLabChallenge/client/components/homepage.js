import React, { Component } from 'react';

const frameworks = {
  react: "https://api.github.com/repos/facebook/react",
  angular: "https://api.github.com/repos/angular/angular.js",
  ember: "https://api.github.com/repos/emberjs/ember.js",
  vue: "https://api.github.com/repos/vuejs/vue"
}

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      reactData: {starCount: 0, issueCount: 0, weeklyCommitCount: 0, monthlyCommitCount: 0},
      angularData: {starCount: 0, issueCount: 0, weeklyCommitCount: 0, monthlyCommitCount: 0},
      emberData: {starCount: 0, issueCount: 0, weeklyCommitCount: 0, monthlyCommitCount: 0},
      vueData: {starCount: 0, issueCount: 0, weeklyCommitCount: 0, monthlyCommitCount: 0}
    };
  }

  componentDidMount() {
    Object.keys(frameworks).forEach((framework => {
      console.log('gets here')
      fetch(frameworks[framework])
      .then(res => res.json())
      .then(body => {
        this.setState((prev) => {
          prev[`${framework}Data`].starCount = body.stargazers_count
          prev[`${framework}Data`].issueCount = body.open_issues_count
          prev[`${framework}Data`].forkCount = body.forks
        })
      });
      fetch(`${frameworks[framework]}/stats/commit_activity`)
      .then(res => res.json())
      .then(body => {
        this.setState((prev) => {
          prev[`${framework}Data`].weeklyCommitCount = body[body.length - 1].total
          prev[`${framework}Data`].monthlyCommitCount = body[body.length - 1].total + body[body.length - 2].total + body[body.length - 3].total + body[body.length - 4].total
        })
      });
    }))
  }

  render() {
    console.log(this.state)
    return (
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
              <td>{this.state.reactData.starCount}</td>
              <td>{this.state.angularData.starCount}</td>
              <td>{this.state.emberData.starCount}</td>
              <td>{this.state.vueData.starCount}</td>
            </tr>
            <tr>
              <td>Number of Forks</td>
              <td>{this.state.reactData.forkCount}</td>
              <td>{this.state.angularData.forkCount}</td>
              <td>{this.state.emberData.forkCount}</td>
              <td>{this.state.vueData.forkCount}</td>
            </tr>
            <tr>
              <td>Number of Commits From Past Week</td>
              <td>{this.state.reactData.weeklyCommitCount}</td>
              <td>{this.state.angularData.weeklyCommitCount}</td>
              <td>{this.state.emberData.weeklyCommitCount}</td>
              <td>{this.state.vueData.weeklyCommitCount}</td>
            </tr>
            <tr>
              <td>Number of Commits From Past Month</td>
              <td>{this.state.reactData.monthlyCommitCount}</td>
              <td>{this.state.angularData.monthlyCommitCount}</td>
              <td>{this.state.emberData.monthlyCommitCount}</td>
              <td>{this.state.vueData.monthlyCommitCount}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export default Homepage;
