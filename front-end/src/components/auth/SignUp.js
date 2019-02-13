import React, { Component } from 'react';
import { connect } from 'react-redux';
import authActions from '../../store/actions/authAction';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo : {
        username : '',
        email : '',
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
      userInfo : {
        ...this.state.userInfo,
        [e.target.name] : e.target.value
      }
    })
  }
  // function for handling data when submitting
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });

    this.props.dispatch(authActions.signUp(this.state.userInfo, (userStatus) => {
      if(userStatus === true) {
        this.setState({
          isLoading: false,
        });
        this.props.history.push('/login');
      }
    }))
  }
  
  render() {
    const {msg, isLoading} = this.state;
    return (
      isLoading ? <p>Loading...</p> : (
        <div className="container">
          <h2 className="center">Sign Up</h2>
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <input type="text" 
            name="username"
            placeholder="Enter your username" 
            onChange={this.handleChange}
            required/><br />
            <input type="email" 
            name="email" 
            placeholder="Enter your email" 
            onChange={this.handleChange}
            required/><br />
            <input type="password" 
            name="password" 
            placeholder="Enter your password" 
            onChange={this.handleChange}
            required/><br />
            <button type="submit" className="btn started-btn">Sign Up</button>
          </form>
        </div>
      )
    );
  }
}

export default connect()(SignUp);