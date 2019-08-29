import React, { Component } from 'react';
import { fetchGitData, fetchCommitData, fetchVotes, addVote } from '../store';
import { connect } from 'react-redux';
import NotFound from './notFound';

class Homepage extends Component {

  constructor() {
    super();
    this.commitCountHelpFunc = this.commitCountHelpFunc.bind(this);
    this.handleVote = this.handleVote.bind(this);
  };

  componentDidMount() {
    this.props.fetchGitData();
    this.props.fetchCommitData();
    this.props.fetchVotes();

    // refreshes the page every 60 seconds.
    setInterval(() => {
      this.props.fetchGitData();
      this.props.fetchCommitData();
      this.props.fetchVotes();
    }, 60000);
  }

  handleVote(evt) {
    this.props.addVote(evt.target.value);
  }

  // calculates the number of commits weekly and monthly
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
    const votes = this.props.votes
    return (
      commitData.reactData.length ?
      <React.Fragment>
        <h1>Comparison of client-side Javascript frameworks</h1>
        <h3>(Refreshes every 60 seconds)</h3>
        <table>
          <tbody>
            <tr>
              <td/>
              <td>Number of Stars</td>
              <td>Number of Forks</td>
              <td>Number of Commits From Past Week</td>
              <td>Number of Commits From Past Month</td>
              <td>Number of Votes</td>
            </tr>
            <tr>
              <td className='category'>React</td>
              <td>{gitData.reactData.stargazers_count}</td>
              <td>{gitData.reactData.forks}</td>
              <td>{this.commitCountHelpFunc('week', commitData.reactData)}</td>
              <td>{this.commitCountHelpFunc('month', commitData.reactData)}</td>
              <td>{votes.react}</td>
              <td className='buttonCell'>
                <button type='button' value='react' onClick={this.handleVote}>Vote!</button>
              </td>
            </tr>
            <tr>
              <td className='category'>Angular</td>
              <td>{gitData.angularData.stargazers_count}</td>
              <td>{gitData.angularData.forks}</td>
              <td>{this.commitCountHelpFunc('week', commitData.angularData)}</td>
              <td>{this.commitCountHelpFunc('month', commitData.angularData)}</td>
              <td>{votes.angular}</td>
              <td className='buttonCell'>
                <button type='button' value='angular' onClick={this.handleVote}>Vote!</button>
              </td>
            </tr>
            <tr>
              <td className='category'>Ember</td>
              <td>{gitData.emberData.stargazers_count}</td>
              <td>{gitData.emberData.forks}</td>
              <td>{this.commitCountHelpFunc('week', commitData.emberData)}</td>
              <td>{this.commitCountHelpFunc('month', commitData.emberData)}</td>
              <td>{votes.ember}</td>
              <td className='buttonCell'>
                <button type='button' value='ember' onClick={this.handleVote}>Vote!</button>
              </td>
            </tr>
            <tr>
              <td className='category'>Vue</td>
              <td>{gitData.vueData.stargazers_count}</td>
              <td>{gitData.vueData.forks}</td>
              <td>{this.commitCountHelpFunc('week', commitData.vueData)}</td>
              <td>{this.commitCountHelpFunc('month', commitData.vueData)}</td>
              <td>{votes.vue}</td>
              <td className='buttonCell'>
                <button type='button' value='vue' onClick={this.handleVote}>Vote!</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h3>( You can vote only once! )</h3>
      </React.Fragment> :
      <NotFound />
    )
  }
}

const mapState = (state) => {
  return {
    gitData: state.gitData,
    commitData: state.commitData,
    votes: state.votes
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchGitData: () => dispatch(fetchGitData()),
    fetchCommitData: () => dispatch(fetchCommitData()),
    fetchVotes: () => dispatch(fetchVotes()),
    addVote: (framework) => dispatch(addVote(framework))
  };
}

export default connect(mapState, mapDispatch)(Homepage);
