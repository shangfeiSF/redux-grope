import React from 'react'
import {Link} from 'react-router'
import TestUtils from 'react-addons-test-utils'

import User from '../../../../../main/10.real-world/src/components/modules/User'

const setup = propOverrides => {
  const props = Object.assign({
    user: {
      login: 'tj',
      avatarUrl: 'https://avatars.githubusercontent.com/u/25254?v=3',
      name: 'TJ Holowaychuk'
    }
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <User {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('User', () => {
  it('should display correctly', () => {
    const {output, props} = setup()
    const {user: {login, avatarUrl, name}} = props

    expect(output.type).toBe('div')
    expect(output.props.className).toBe('User')

    const link = output.props.children

    expect(link.type).toBe(Link)
    expect(link.props.to).toEqual(`/${login}`)

    const [img, h3] = link.props.children

    expect(img.type).toBe('img')
    expect(img.props.src).toEqual(avatarUrl)
    expect(img.props.alt).toEqual(login)
    expect(img.props.width).toBe('72')
    expect(img.props.height).toBe('72')

    expect(h3.type).toBe('h3')

    const [loginText, spaceText, span] = h3.props.children

    expect(loginText).toEqual(login)
    expect(spaceText).toEqual(' ')

    expect(span.type).toBe('span')
    expect(span.props.children).toEqual(['(', name, ')'])
  })
})