import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import storyActions from '../store/actions/storyActions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  } 
  
  componentDidMount() {
    const {auth} = this.props;
    if(auth.user) {
      this.getStories()
    } 
  }

  getStories = () => {
    const {auth} = this.props;
    this.props.dispatch(storyActions.getUserStories(auth.user._id, (dataStatus) => {
      if(dataStatus) {
        this.setState({
          isLoading: false
        })
      }
    }))
  }

  handleDelete = e => {
    const {id} = e.target.parentElement;
    this.setState({
      isLoading: true
    })
    this.props.dispatch(storyActions.deleteStory(id, (deleteStatus) => {
      if(deleteStatus) {
        this.getStories();
      }
    }))
  }

  handlePublish = e => {
    const {id} = e.target.parentElement;
    this.setState({
      isLoading :true
    })
    this.props.dispatch(storyActions.publishStory(
      {
        userId : this.props.auth.user._id,
        id
      },
      (publishedStatus) => {
        if(publishedStatus) {
          this.getStories();
        }
      }
    ))
  }

  render() {
    const {auth, stories} = this.props;
    const {isLoading} = this.state;
    const publishedStories = stories.filter(story => story.published === true);
    const drafts = stories.filter(story => story.published === false) 
    if(!auth.token) return <Redirect to="/login"/>

    return (
      <div className="container">
        <h2 className="center">{auth.user.username}</h2>
        <h3>Published</h3>
        {
          isLoading ? <p>Loading...</p> : (
            publishedStories.map((story, i) => (
              <div key={story._id} id={story._id}>
                <p> {i+ 1}. {story.description}</p>
                <button onClick={this.handleDelete}>Delete</button>
              </div>
            ))
          )
        }
        <h3>All Drafts </h3>
        {
          isLoading ? <p>Loading...</p> : (
            drafts.map((story, i) => (
              <div key={story._id} id={story._id}>
                <p> {i+ 1}. {story.description}</p>
                <button>
                  <Link to={`/edit/${story._id}`}>Edit</Link>
                </button>
                <button onClick={this.handlePublish}>Publish Draft</button>
                <button onClick={this.handleDelete}>Delete</button>
              </div>
            ))
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {auth, stories} = state;
  return {
    auth,
    stories,
  }
}

export default connect(mapStateToProps)(Profile);