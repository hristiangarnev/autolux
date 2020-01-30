import React, { Component } from 'react';
import Header from './Header';
import Header from './Meta';

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default Page;