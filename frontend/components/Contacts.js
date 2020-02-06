import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ContactsElement = styled.ul`
  display: flex;
  flex: 1;
  align-self: flex-end;
  flex-direction: column;
  align-items: flex-end;
  list-style: none;

  li {
    a {
      font-size: 14px;
      color: #fff;
      transition: color 0.5s;

      &:hover {
        color: red;
      }
    }
  }
`;

class Contacts extends Component {
  render() {
    return (
      <ContactsElement>
        <li>
          <Link href="mailto:info@autolux.bg">
            <a>
              info@autolux.bg
            </a>
          </Link>
        </li>
        <li>
          <Link href="tel:359888811912">
            <a>
              +359888811912
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              Lozenets, Example str
            </a>
          </Link>
        </li>
      </ContactsElement>
    );
  }
}

export default Contacts;