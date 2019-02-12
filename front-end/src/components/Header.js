// https://github.com/inkredo/full-stack-developer-challenge/blob/master/README.md

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        This is header  
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    );
  }
}

export default Header;