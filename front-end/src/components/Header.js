// https://github.com/inkredo/full-stack-developer-challenge/blob/master/README.md

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends Component {
  render() {
    const {token, user} = this.props.auth;
    
    return (
      <div>
        This is header  
        {
          !token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ): (
            <>
              <Link to={`/profile/drafts/create`}>Create</Link>
              <Link to={`/profile`}>Profile</Link>
            </>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {
    auth
  }
}

export default connect(mapStateToProps)(Header);