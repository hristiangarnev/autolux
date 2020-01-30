import React, { Component } from 'react';
import Link from 'next/link';

const Nav = () => (
  <div>
    <Link href="/">
      <a>
        Home
      </a> 
    </Link>
    <Link href="/cars">
      <a>
        Cars
      </a> 
    </Link>
  </div>
)

export default Nav;