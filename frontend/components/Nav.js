import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import User from "./User";
import SignOut from "./SignOut";

const NavElement = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;

  > a,
  > button {
    display: flex;
    font-size: 15px;
    line-height: 1.2;
    padding: 8px;
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavElement>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/search">
          <a>Search</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
        {me && (
          <>
            <Link href="/account">
              <a>Account</a>
            </Link>
            <Link href="/sell">
              <a>Add Car</a>
            </Link>
            <SignOut />
          </>
        )}
        {!me && (
          <>
            <Link href="/signin">
              <a>Sign In</a>
            </Link>
          </>
        )}
      </NavElement>
    )}
  </User>
);

export default Nav;
