import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    line-height: 1.2;
  }
  #wrapper {
    max-width: 960px;
    margin: 0 auto;
  }
  a {
    color: #000;
    text-decoration: none;
  }
`;

class Page extends Component {
  render() {
    return (
      <div id="wrapper">
        <Meta />
        {/* <GlobalStyle /> */}
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default Page;