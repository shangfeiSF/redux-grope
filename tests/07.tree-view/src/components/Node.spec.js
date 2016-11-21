import React from 'react'
import {shallow} from 'enzyme'
import {mount} from 'enzyme'
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

    output.find('strong').simulate('click', {
      preventDefault: jest.fn()
    })
    expect(output.state().show).toEqual(false)
  })

  it('should call actions.increment when click incrementButton of node#0', () => {
    const rootId = 0
    const {output, props} = setup(rootId)

    const [div] = output.props.children
    const [, , incrementButton] = div.props.children

    incrementButton.props.onClick({
      preventDefault: jest.fn()
    })

    expect(props.actions.increment).toBeCalledWith(rootId)
  })

  it('should call actions.createNode and  actions.addChild when click addButton of node#0', () => {
    const rootId = 0
    const {output, props} = setup(rootId)

    const [div] = output.props.children
    const [, , , addButton] = div.props.children

    let maxId = props.tree.length - 1
    let childId = maxId + 1

    props.actions.createNode = jest.fn(() => ({
      id: 10
    }))

    addButton.props.onClick({
      preventDefault: jest.fn()
    })

    expect(props.actions.createNode).toBeCalledWith(maxId)
    expect(props.actions.addChild).toBeCalledWith(rootId, childId)
  })

  it('should call actions.removeChild and actions.deleteNode when click addButton of node#0', () => {
    const rootId = 0
    const {output, props} = setup(rootId)

    const [div] = output.props.children
    const [, , , , removeButton] = div.props.children

    removeButton.props.onClick({
      preventDefault: jest.fn()
    })

    expect(props.actions.removeChild).toBeCalledWith(undefined, rootId)
    expect(props.actions.deleteNode).toBeCalledWith(rootId)
  })

  it('should call actions.removeChild and actions.deleteNode when click addButton of node#1', () => {
    const rootId = 0
    const currentId = 1
    const {props, renderer} = setup(rootId)

    const node1 = renderer.render(
      <Node id={currentId} tree={props.tree} actions={props.actions} parentId={rootId}/>
    )
    const [div] = node1.props.children
    const [, , , , removeButton] = div.props.children

    removeButton.props.onClick({
      preventDefault: jest.fn()
    })

    expect(props.actions.removeChild).toBeCalledWith(rootId, currentId)
    expect(props.actions.deleteNode).toBeCalledWith(currentId)
  })

  it('should call actions.generateTree when click generateTreeButton with default input', () => {
    const {props} = setup()

    const output = mount(<Node {...props}></Node>)

    output.find('button').simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.actions.generateTree).toBeCalledWith({
      rootId: 0,
      total: 2,
      dilution: 1,
      limit: 1,
      threshold: 10
    })
  })

  it('should call actions.generateTree when click generateTreeButton with user input', () => {
    const {props} = setup()

    const output = mount(<Node {...props}></Node>)

    const configOverrides = {
      rootId: 10,
      total: 20,
      dilution: 5,
      limit: 4,
      threshold: 15
    }

    Object.keys(output.node.refs).forEach(key => {
      output.node.refs[key].value = configOverrides[key]
    })

    output.find('button').simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.actions.generateTree).toBeCalledWith(configOverrides)
  })
})