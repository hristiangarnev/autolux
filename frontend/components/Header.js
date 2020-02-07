import React, { Component } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Logo from './Logo';

const HeaderElement = styled.header`
  display: flex;
  align-items: center;
  padding: 10px;
  max-width: 960px;
  margin: 0 auto;
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