import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavElement = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  height: 32px;

  a {
    display: flex;
    color: #fff;
    font-size: 15px;
    line-height: 1.2;
    margin-left: -5px;

    span {
      background: red;
      padding: 7px 20px;
    }

    &:after {
      width: 0;
      height: 0;
      border-left: 0 solid transparent;
      border-right: 10px solid transparent;
      border-top: 32px solid red;
      content: '';
    }

    &:before {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 0 solid transparent;
      border-bottom: 32px solid red;
      content: '';
    }

    &:last-child {
      &:after {
        display: none;
      }
    }
  }
`;

const Nav = () => (
  <NavElement>
    <Link href="/">
      <a>
        <span>
          Home
        </span>
      </a>
    </Link>
    <Link href="/search">
      <a>
        <span>
          Search
        </span>
      </a>
    </Link>
    <Link href="/contact">
      <a>
        <span>
          Contact
        </span>
      </a>
    </Link>
  </NavElement>
)

export default Nav;