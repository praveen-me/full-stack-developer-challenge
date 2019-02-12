import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import storyActions from '../../store/actions/storyActions';

class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description:'' 
    }
  }

  handleChange = e => {
    this.setState({
      description: e.target.value
    })
  }

  handleSubmit = (e, {published}) => {
    e.preventDefault()
    const {username, _id} = this.props.auth.user;
    console.log(username, _id, published);

    //TODO:
    // 1 -Send user creds with dispatching actions
    // 2 - Handle the callback then redirect it to
    // /users/:id(Profile) 


    this.props.dispatch(storyActions.addStory({
      ...this.state,
      username,
      userId: _id,
      published
    }, (dataStatus) => {
      this.props.history.push('/profile')
    }))
  }
  
  render() {
    const {description} = this.state;
    const {token} = this.props.auth;

    if(!token) return <Redirect to="/login"/>

    return (
      <div>
        <h1>Add Story</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
          value={description}
          onChange={this.handleChange}/>
          <button type="submit" onClick={(e) => this.handleSubmit(e, {
            published : false
          })}>Add to Drafts</button>
          <button type="submit" onClick={(e) => this.handleSubmit(e, {
            published : true
          })}>Add to Stories</button>
        </form>
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

export default connect(mapStateToProps)(CreateStory);