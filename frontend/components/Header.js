import React, { Component } from 'react';
import Nav from './Nav';
import Logo from './Logo';

class Header extends Component {
  render() {
    return (
      <div>
        <Logo />
        <Nav />
      </div>
    );
  }
}

export default Header;