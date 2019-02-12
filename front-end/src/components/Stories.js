import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state= {
      jwt: ''
    }
  }
  
  render() {
    const {jwt} = this.state;
    if(!jwt) return <Redirect to='login'/>

    return (
      <div>
        Stories Display here
      </div>
    );
  }
}

export default Stories;