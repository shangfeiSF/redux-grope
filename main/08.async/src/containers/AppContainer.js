import {connect} from 'react-redux'

import  App from '../components/App'

const mapStateToProps = state => {
  const {selectedReddit, postsByReddit} = state

  const {isFetching, lastUpdated, items:posts} = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    isFetching,
    lastUpdated,
    posts
  }
}

export default connect(mapStateToProps)(App)