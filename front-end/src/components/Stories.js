import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { stat } from 'fs';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state= {
      jwt: ''
    }
  }
  
  render() {
    const {token} = this.props.auth;
    console.log(this.props.auth)
    if(!token) return <Redirect to='login'/>

    return (
      <div>
        Stories Display here
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

export default connect(mapStateToProps)(Stories);