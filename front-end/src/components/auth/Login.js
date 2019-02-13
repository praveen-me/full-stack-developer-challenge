import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import authActions from '../../store/actions/authAction';
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo : {
        username : '',
        password : ''
      },
      isLoading : false,
    }
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      msg : '',
      userInfo: {
        ...this.state.userInfo,
        [e.target.name] : e.target.value
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isLoading : true
    })
    this.props.dispatch(authActions.logIn(this.state.userInfo, (userStatus) => {
      if(userStatus) {
        this.setState({
          isLoading : false,
          msg : ''
        })
        this.props.history.push('/');
      } 
    }))
  }
  
  render() {
    const {isLoading} = this.state;
    const {auth} = this.props;

    if(auth.token) return <Redirect to='/'/>

    return (
      isLoading ? <p>Loading...</p> : (
        <div className="container">
          <h2 className="center">Log In</h2>
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <input type="text" name="username" placeholder="Enter your username" onChange={this.handleChange}/><br />
            <input type="password" name="password" placeholder="Enter your password"
            onChange={this.handleChange}/><br />
            <button type="submit" className="btn started-btn">Log In</button>
          </form>
        </div>
      )
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {
    auth,
  }
}

export default connect(mapStateToProps)(LogIn);