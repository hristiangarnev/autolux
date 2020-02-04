import React, { Component } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Logo from './Logo';

const HeaderElement = styled.header`
  display: flex;
`;

class Header extends Component {
  render() {
    return (
      <HeaderElement>
        <Logo />
        <Nav />
      </HeaderElement>
    );
  }
}

export default Header;