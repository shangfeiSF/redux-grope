import React, {Component, PropTypes} from 'react'

class Picker extends Component {
  static propTypes = {
    current: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
    onChange: PropTypes.func.isRequired
  }

  handlerOnChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render() {
    const {current, options} = this.props

    return (
      <div>
        <h1>{current}</h1>

        <select onChange={this.handlerOnChange} value={current}>
          {
            options.map(option =>
              <option value={option} key={option}>
                {option}
              </option>
            )
          }
        </select>
      </div>
    )
  }
}

export default Picker