import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Contacts from './Contacts';

const NavElement = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;

  > a {
    display: flex;
    color: #fff;
    font-size: 15px;
    line-height: 1.2;
    margin-left: -15px;
    height: 32px;

    span {
      background: red;
      padding: 7px 20px;
      transition: background 0.5s;
    }

    &:before,
    &:after {
      width: 0;
      height: 0;
      content: '';
      transition: border-color 0.5s;
    }

    &:after {
      border-right: 20px solid transparent;
      border-left: 0 solid transparent;
      border-bottom: 32px solid red;
    }

    &:before {
      border-right: 0 solid transparent;
      border-left: 20px solid transparent;
      border-top: 32px solid red;
    }

    &:hover {
      color: red;

      span {
        background: #fff;
      }

      &:before {
        border-top-color: #fff;
      }

      &:after {
        border-bottom-color: #fff;
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

    {/* <Contacts /> */}
  </NavElement>
)

export default Nav;