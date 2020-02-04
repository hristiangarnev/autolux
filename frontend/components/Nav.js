import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavElement = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Nav = () => (
  <NavElement>
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