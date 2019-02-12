import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import storyActions from '../store/actions/storyActions';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.dispatch(storyActions.getAllStories((storiesStatus) => {
      if(storiesStatus) {
        this.setState({
          isLoading: false
        })
      }
    }))
  }
  
  render() {
    const {auth, stories} = this.props;
    const {isLoading} = this.state;
    console.log(stories)
    if(!auth.token) return <Redirect to='login'/>

    return (
      <div>
        <h2> Stories</h2>
        {
          isLoading ? <p>Loading...</p> : (
            stories && stories.map((story, i) => (
              <div key={story._id}>
                {i+1}. <Link to="#">{story.description}</Link>
                <p>user - {story.username} claps - {story.userClapped.length}</p>
                <p><button>Clap</button></p>
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

export default connect(mapStateToProps)(Stories);