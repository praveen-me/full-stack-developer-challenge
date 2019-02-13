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
      <header className="container">
        <h1 className="logo"><Link to='/'>Inkredo Task</Link></h1>  
        {
          !token ? (
            <div>
              <Link to="/login" className="button">Login</Link><br />
              <Link to="/signup" className="button">Signup</Link>
            </div>
          ): (
            <div>
              <Link to={`/profile/drafts/create`}className="button">Create</Link><br />
              <Link to={`/profile`} className="button">Profile</Link>
              <button onClick={this.handleLogout}>Log Out</button>
            </div>
          )
        }
      </header>
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