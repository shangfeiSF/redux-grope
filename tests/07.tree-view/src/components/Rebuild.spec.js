import React from 'react'
import TestUtils from 'react-addons-test-utils'

import generateTree from '../../../../main/07.tree-view/src/utils/generateTree'
import Rebuild from '../../../../main/07.tree-view/src/components/Rebuild'

const setup = (propOverrides) => {
  const props = {
    rootId: 0,

    tree: generateTree(propOverrides || {}),

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
  it('should display correctly when tree.maxId is equal to or lower than tree.threshold', () => {
    const {output} = setup()

    expect(output.type).toBe('p')

    const button = output.props.children

    expect(button.type).toBe('button')
    expect(button.props.children).toBe('Rebuild Tree')
  })

  it('should display correctly when tree.maxId is greater than tree.threshold', () => {
    const configOverrides = {
      rootId: 10,
      total: 20,
      dilution: 5,
      limit: 4,
      threshold: 15
    }

    const {output} = setup(configOverrides)

    expect(output).toBe(null)
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