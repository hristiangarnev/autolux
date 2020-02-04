import React, { Component } from 'react';
import styled from 'styled-components';

const LogoElement = styled.div`
  display: flex;
`;

class Logo extends Component {
  render() {
    return (
      <LogoElement>Logo</LogoElement>
    );
  }
}

export default Logo;