import React from 'react'
import {shallow} from 'enzyme'
import TestUtils from 'react-addons-test-utils'

import generateTree from '../../../../main/07.tree-view/src/utils/generateTree'
import Node from '../../../../main/07.tree-view/src/components/Node'

const setup = (id, propOverrides) => {
  const props = {
    id: id,

    tree: generateTree(propOverrides || {}),

    actions: {
      generateTree: jest.fn(),
      rebuildTree: jest.fn(),
      increment: jest.fn(),
      createNode: jest.fn(),
      deleteNode: jest.fn(),
      addChild: jest.fn(),
      removeChild: jest.fn()
    }
  }

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Node {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('Node component', () => {
  it('should display correctly when id = undefined', () => {
    const {output} = setup()

    const [h1, h4, table, p] = output.props.children
    const tbody = table.props.children

    expect(h1.type).toBe('h1')
    expect(h1.props.children).toBe('There is no Tree to view')

    expect(h4.type).toBe('h4')
    expect(h4.props.children).toBe('Please set up the tree config used to draw the tree.')

    expect(table.type).toBe('table')

    expect(tbody.type).toBe('tbody')
    expect(tbody.props.children).toEqual([
      <tr>
        <td>rootId</td>
        <td>
          <input type="number" ref="rootId"/>
        </td>
      </tr>,
      <tr>
        <td>total</td>
        <td>
          <input type="number" ref="total"/>
        </td>
      </tr>,
      <tr>
        <td>dilution</td>
        <td>
          <input type="number" ref="dilution"/>
        </td>
      </tr>,
      <tr>
        <td>limit</td>
        <td>
          <input type="number" ref="limit"/>
        </td>
      </tr>,
      <tr>
        <td>threshold</td>
        <td>
          <input type="number" ref="threshold"/>
        </td>
      </tr>
    ])

    expect(p.type).toBe('p')
    expect(p.props.children.type).toBe('button')
    expect(p.props.children.props.children).toBe('Generate Tree')
  })

  it('should display correctly when id = 0', () => {
    const {output, props} = setup(0)

    expect(output.type).toBe('div')
    expect(output.props.className).toBe('node')

    const [div, ul] = output.props.children

    expect(div.type).toBe('div')
    expect(div.props.className).toBe('info')
    expect(div.props.style).toEqual({"paddingTop": "10, 0"})

    expect(ul.type).toBe('ul')
    expect(ul.props.className).toBe('childNode')
    expect(ul.props.style).toEqual({"margin": 0, "listStyle": "none", "display": "block"})

    const [idArea, text, incrementButton, addButton, removeButton] = div.props.children

    expect(idArea.type).toBe('strong')
    expect(idArea.props.children).toEqual(props.id)

    expect(text).toEqual(' --- ')

    expect(incrementButton.type).toBe('a')
    expect(incrementButton.props.children).toEqual(['(', props.tree[props.id].counter, ')'])

    expect(addButton.type).toBe('a')
    expect(addButton.props.children).toEqual('+')

    expect(removeButton.type).toBe('a')
    expect(removeButton.props.children).toEqual('x')

    const childNodes = ul.props.children

    expect(childNodes.length).toEqual(props.tree[props.id].childIds.length)

    childNodes.forEach(child => {
      let node = child.props.children

      expect(child.type).toBe('li')
      expect(node.type).toBe(Node)

      expect(node.props.tree).toEqual(props.tree)
      expect(node.props.actions).toEqual(props.actions)
      expect(node.props.parentId).toEqual(props.id)
    })
  })

  it('should change the state.show when click idArea', () => {
    const {props} = setup(0)

    const output = shallow(<Node {...props}></Node>)
    expect(output.state().show).toEqual(true)

    const idArea = output.find('strong')

/*    idArea.props.onClick({
      preventDefault: jest.fn()
    })

    expect(output.state).toBe(false)*/
  })

  /*  it('should not render remove link', () => {
   const {removeLink} = setup(1, 23, [])
   expect(removeLink.length).toEqual(0)
   })

   it('should call createNode action on Add child click', () => {
   const {addLink, actions, eventArgs} = setup(2, 1, [])
   actions.createNode.mockReturnValue({nodeId: 3})
   addLink.simulate('click', eventArgs)

   expect(actions.createNode).toBeCalled()
   })

   it('should call addChild action on Add child click', () => {
   const {addLink, actions, eventArgs} = setup(2, 1, [])
   actions.createNode.mockReturnValue({nodeId: 3})

   addLink.simulate('click', eventArgs)

   expect(actions.addChild).toBeCalledWith(2, 3)
   })

   describe('when given childIds', () => {
   it('should render child nodes', () => {
   const {childNodes} = setup(1, 23, [2, 3])
   expect(childNodes.length).toEqual(2)
   })
   })

   describe('when given parentId', () => {
   it('should call removeChild action on remove link click', () => {
   const {removeLink, actions, eventArgs} = setup(2, 1, [], 1)
   removeLink.simulate('click', eventArgs)

   expect(actions.removeChild).toBeCalledWith(1, 2)
   })

   it('should call deleteNode action on remove link click', () => {
   const {removeLink, actions, eventArgs} = setup(2, 1, [], 1)
   removeLink.simulate('click', eventArgs)

   expect(actions.deleteNode).toBeCalledWith(2)
   })
   })*/
})
