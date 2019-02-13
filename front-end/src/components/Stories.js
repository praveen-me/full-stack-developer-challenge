import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import storyActions from '../store/actions/storyActions';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isLoading: true,
      query: '',
      sort: 'default'
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

  handleClap = (e, {id, userId}) => {
    const {user} = this.props.auth;
    if(user._id !== userId) {
      this.setState({
        isLoading: true
      })
      this.props.dispatch(storyActions.upvote({
        id : id, 
        userId: user._id
      }, (clappedStatus) => {
        this.props.dispatch(storyActions.getAllStories((storiesStatus) => {
          if(storiesStatus) {
            this.setState({
              isLoading: false
            })
          }
        }))
      }))
    }
  }

  handleQuery = e => {
    this.setState({
      query: e.target.value
    })
  }

  handleSort = e => {
    this.setState({
      sort: e.target.value
    })
  }
  
  render() {
    const {auth, stories} = this.props;
    const {isLoading, query, sort} = this.state;
    let displayStories = [];
    
    const lastLogout = new Date(localStorage.getItem('lastLogoutTime')).getTime();
    const now = Date.now();
    
    // sorting stories according to user unseen
    if(stories.length > 0) {
      let topStories = []
      let normalStories = []
      for(let i = 0; i < stories.length; i++) {
        const storyTime = new Date(stories[i]).getTime();
        if( Number(storyTime) > Number(lastLogout) && Number(storyTime) < Number(now)) {
          topStories.push(stories[i])
        } else {
          normalStories.push(stories[i])
        }
      }

      displayStories = [...topStories, ...normalStories];
    }

    if(query) {
      const regexp = new RegExp(query, 'i')
      displayStories = displayStories.filter(story => regexp.test(story.description)); 
    } else {
      displayStories = stories
    }

    if(sort === 'date') {
      displayStories = [...displayStories].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else {
      displayStories = [...displayStories]
    }

    if(!auth.token) return <Redirect to='login'/>

    return (
      <div>
        <h2> Stories</h2>
        <input type="text" onChange={this.handleQuery} value={query}/>
        <select name="sort" onChange={this.handleSort} value={sort}>
          <option value="default">Default</option>
          <option value="date">Date</option>
        </select>
        {
          isLoading ? <p>Loading...</p> : (
            displayStories && displayStories.map((story, i) => (
              <div key={story._id}>
                <p>{i+1}. {story.description}</p>
                <p>user - {story.username} <br />  upvotes - {story.userClapped.length}</p>
                <button onClick={(e) => this.handleClap(e, {
                  id: story._id,
                  userId: story.userId
                })}>Upvote</button>
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