import React, {Component, PropTypes} from 'react'

import GithubBox from './GithubBox'

class ResultPage extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onSubmitUserId: PropTypes.func.isRequired
  }

  loadData(props) {
    props.onSubmitUserId()
  }

  componentWillMount() {
    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.loadData(nextProps)
    }
  }

  render() {
    return (
      <div>
        <GithubBox data={this.props.data} userId={this.props.userId}/>
      </div>
    )
  }
}

export default ResultPage