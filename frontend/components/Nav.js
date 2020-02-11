import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import User from './User';

const NavElement = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;

  > a {
    display: flex;
    font-size: 15px;
    line-height: 1.2;
    padding: 8px;
  }
`;

const Nav = () => (
  <NavElement>
    <User>
      {({data: { me } }) => {
        if(me) {
          return <p>{me.name}</p>;
        }
        return null;
      }}
    </User>
    <Link href="/">
      <a>
        Home
      </a>
    </Link>
    <Link href="/search">
      <a>
        Search
      </a>
    </Link>
    <Link href="/contact">
      <a>
        Contact
      </a>
    </Link>
  </NavElement>
)

export default Nav;