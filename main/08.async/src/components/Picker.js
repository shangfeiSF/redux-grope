import React, {Component, PropTypes} from 'react'

class Picker extends Component {
  static propTypes = {
    themes: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
    selected: PropTypes.string.isRequired,

    asyncActions: PropTypes.object.isRequired,
    syncActions: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const {themes, selected, asyncActions, syncActions} = nextProps

    if (nextProps.selected !== this.props.selected) {
      if (themes.indexOf(selected) < 0) {
        syncActions.add(selected)
      }

      asyncActions.fetchIfNeed(selected)
    }
  }

  handlerOnChange = e => {
    this.refs.appointedTheme.value = ''

    this.props.syncActions.select(e.target.value)
  }

  handlerOnClick = e => {
    e.preventDefault()

    const theme = this.refs.appointedTheme.value

    if (theme.length && theme !== this.props.selected) {
      this.props.syncActions.select(theme)
    }
  }

  render() {
    const {selected, themes} = this.props

    return (
      <div>
        <h1>{selected}</h1>

        <select onChange={this.handlerOnChange} value={selected}>
          {
            themes.map(theme =>
              <option value={theme} key={theme}>
                {theme}
              </option>
            )
          }
        </select>

        <p>
          <input type="text" ref="appointedTheme"/>
          <button onClick={this.handlerOnClick} style={{marginLeft: 10}}>Fetch</button>
        </p>
      </div>
    )
  }
}

export default Picker