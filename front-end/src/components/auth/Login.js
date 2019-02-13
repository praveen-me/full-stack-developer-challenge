import React, { Component } from 'react';
// import AuthButton from './AuthButton';
import { connect } from 'react-redux';
// import {logIn} from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import authActions from '../../store/actions/authAction';
// import Loader from '../project/LoStoriesader';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo : {
        username : '',
        password : ''
      },
      isLoading : false,
      msg : ''
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
    const {msg, isLoading} = this.state;
    const {auth} = this.props;
    
    if(auth.token) return <Redirect to='/'/>

    return (
      // isLoading ? <Loader/> : (
        <div className="auth-container wrapper middle">
          {/* <AuthButton />         */}
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <input type="text" name="username" placeholder="Enter your username" onChange={this.handleChange}/>
            <input type="password" name="password" placeholder="Enter your password"
            onChange={this.handleChange}/>
            {
              msg ? <p className="warning-box">{msg}</p> : ''
            }
            <button type="submit" className="btn started-btn">Log In</button>
          </form>
        </div>
      // )
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