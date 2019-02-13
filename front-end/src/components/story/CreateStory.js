import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import storyActions from '../../store/actions/storyActions';

class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description:'', 
      mode: 'add' 
    }
  }

  componentDidMount() {
    const {path} = this.props.match;
    if(/edit/.test(path)) {
      this.setState({
        mode: 'edit'
      }, () => {
        const {story} = this.props;

        this.setState({
          description: story[0].description
        })
      })
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

    this.props.dispatch(storyActions.addStory({
      ...this.state,
      username,
      userId: _id,
      published
    }, (dataStatus) => {
      if(dataStatus) {
        this.props.history.push('/profile')
      }
    }))
  }

  editDraft = e => {
    e.preventDefault();

    const {story} = this.props; 
    this.props.dispatch(storyActions.editStory(
      {
      id: story[0]._id,
      userId: story[0].userId,
      description: this.state.description
      }, 
      (editStatus) => {
        if(editStatus) {
          this.props.history.push('/profile')    
        }
      }
    ))
  }
  
  render() {
    const {description, mode} = this.state;
    const {token} = this.props.auth;

    if(!token) return <Redirect to="/login"/>

    return (
      <div className="container">
        <h3 className="center">{mode === 'add' ? 'Add Story' : 'Edit Story'}</h3>
        <form onSubmit={this.handleSubmit} className="center">
          <textarea 
          value={description}
          onChange={this.handleChange}/><br />
          {
            mode === 'add' ? (
              <>
                <button type="submit" onClick={(e) => this.handleSubmit(e, {
                  published : false
                })}>Add to Drafts</button><br />
                <button type="submit" onClick={(e) => this.handleSubmit(e, {
                  published : true
                })}>Add to Stories</button>
              </>
            ): (
              <button type="submit" onClick={this.editDraft}>Add to Drafts</button>
            )
          }
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {auth, stories} = state;
  const {id} = ownProps.match.params;
  return {
    auth,
    story: stories.filter(story => story._id === id)  
  }
}

export default connect(mapStateToProps)(CreateStory);