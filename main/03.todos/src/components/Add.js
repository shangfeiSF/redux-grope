import React, {Component, PropTypes} from 'react'

class Add extends Component {
  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  handlerOnSubmit = (e) => {
    e.preventDefault()

    let {onSubmit} = this.props
    let input = this.refs.addInput

    if (!input.value.trim().length) {
      return true
    }
    else {
      /*
       * 容器组件和展示组件的配合方式-1：
       * 容器组件传递action创建方法，展示组件生成输入，展示组件调用action创建方法
       * 展示组件Add将用户输入值作为输入传递给action创建方法（命名为onSubmit）
       * */
      onSubmit(input.value)
      input.value = ''
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handlerOnSubmit}>
          <input ref="addInput"/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default Add