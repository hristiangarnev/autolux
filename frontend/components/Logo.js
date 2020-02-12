import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LogoElement = styled.div`
  max-width: 200px;

  a {
    img {
      max-width: 100%;
    }
  }
`;

class Logo extends Component {
  render() {
    return (
      <LogoElement>
        <Link href="/">
          <a>
            <img src="static/autolux.png" alt="AutoLux"/>
          </a>
        </Link>
      </LogoElement>
    );
  }
}

export default Logo;