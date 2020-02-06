import React, { Component } from 'react';
import styled from 'styled-components';

const LogoElement = styled.a`
  display: flex;
  max-width: 200px;

  img {
    max-width: 100%;
  }
`;

class Logo extends Component {
  render() {
    return (
      <LogoElement href="/">
        <img src="static/autolux.png" alt="AutoLux"/>
      </LogoElement>
    );
  }
}

export default Logo;