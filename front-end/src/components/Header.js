// https://github.com/inkredo/full-stack-developer-challenge/blob/master/README.md

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import authActions from '../store/actions/authAction';

class Header extends Component {
  
  handleLogout = e => {
    this.props.dispatch(authActions.logOut())
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if(token) {
      this.props.dispatch(authActions.isLoggedIn(token))
    }
  }
  
  
  render() {
    const {token} = this.props.auth;

    return (
      <div>
        <h1><Link to='/'>Inkredo Task</Link></h1>  
        {
          !token ? (
            <>
              <Link to="/login">Login</Link><br />
              <Link to="/signup">Signup</Link>
            </>
          ): (
            <>
              <Link to={`/profile/drafts/create`}>Create</Link><br />
              <Link to={`/profile`}>Profile</Link>
              <button onClick={this.handleLogout}>Log Out</button>
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