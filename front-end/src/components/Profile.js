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
      this.props.dispatch(storyActions.getUserStories(auth.user._id, (dataStatus) => {
        if(dataStatus) {
          this.setState({
            isLoading: false
          })
        }
      }))
    } 
  }

  render() {
    const {auth, stories} = this.props;
    const {isLoading} = this.state;
    const publishedStories = stories.filter(story => story.published === true);
    const drafts = stories.filter(story => story.published === false) 
    if(!auth.token) return <Redirect to="/login"/>

    return (
      <div>
        <h1>{auth.user.username}</h1>
        <h3>Published</h3>
        {
          isLoading ? <p>Loading...</p> : (
            publishedStories.map((story, i) => (
              <div>
                {i+ 1}. <Link to={`/stories/${story._id}`}>{story.description}</Link>
                <button>Delete</button>
              </div>
            ))
          )
        }
        <h3>Drafts</h3>
        {
          isLoading ? <p>Loading...</p> : (
            drafts.map((story, i) => (
              <div>
                {i+ 1}. <Link to={`/stories/${story._id}`}>{story.description}</Link>
                <button>Delete</button>
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