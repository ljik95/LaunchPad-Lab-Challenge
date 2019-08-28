import React, { Component } from 'react';
import store from '../store';

class Pixelogic extends Component {
  constructor () {
    super();
    this.state = store.getState();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  handleClick () {}

  render () {
    return (
      <div>Hi</div>
    )
  }
}

export default Pixelogic;
