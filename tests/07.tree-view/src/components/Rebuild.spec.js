import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Rebuild from '../../../../main/07.tree-view/src/components/Rebuild'

const setup = () => {
  const props = {
    rootId: 0,

    actions: {
      rebuildTree: jest.fn()
    }
  }

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Rebuild {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('Rebuild component', () => {
  it('should display correctly', () => {
    const {output} = setup()

    expect(output.type).toBe('p')

    const button = output.props.children

    expect(button.type).toBe('button')
    expect(button.props.children).toBe('Rebuild Tree')
  })

  it('should call rebuildTree on button click', () => {
    const {output, props} = setup()

    const button = output.props.children

    button.props.onClick({
      preventDefault: jest.fn()
    })
    expect(props.actions.rebuildTree).toBeCalledWith(props.rootId)
  })
})