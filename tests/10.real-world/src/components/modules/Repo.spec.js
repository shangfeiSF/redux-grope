import React from 'react'
import {Link} from 'react-router'
import TestUtils from 'react-addons-test-utils'

import Repo from '../../../../../main/10.real-world/src/components/modules/Repo'

const setup = propOverrides => {
  const props = Object.assign({
    repo: {
      name: 'facebook/react',
      description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.'
    },

    owner: {
      login: 'facebook'
    }
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Repo {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('Repo', () => {
  it('should display correctly', () => {
    const {output, props} = setup()
    const {repo: {name, description}, owner: {login}} = props

    expect(output.type).toBe('div')
    expect(output.props.className).toBe('Repo')

    const [h3, p] = output.props.children

    expect(h3.type).toBe('h3')

    const [linkName, text, linkLogin] = h3.props.children

    expect(linkName.type).toBe(Link)
    expect(linkLogin.type).toBe(Link)

    expect(linkName.props.to).toEqual(`/${login}/${name}`)
    expect(linkLogin.props.to).toEqual(`/${login}`)

    expect(text).toEqual(' by ')

    expect(linkName.props.children).toEqual(name)
    expect(linkLogin.props.children).toEqual(login)

    expect(p.type).toBe('p')
    expect(p.props.children).toEqual(description)
  })
})