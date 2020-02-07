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

  @font-face {
    font-family: 'Lato';
    src: url('static/fonts/lato-regular-webfont.woff2') format('woff2'),
         url('static/fonts/lato-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: 'Lato';
    font-size: 16px;
    line-height: 1.2;
  }

  #wrapper {
    /* background: url('static/hero.jpg') no-repeat; */
    /* background-size: cover; */
  }

  .home,
  .car-view,
  .car-update,
  .search,
  .contact,
  .loading {
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
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default Page;