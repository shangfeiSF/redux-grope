import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import {Provider} from 'react-redux'
import {Router} from 'react-router'

import routes from '../../../../../main/10.real-world/src/routes/routes'
import Root from '../../../../../main/10.real-world/src/routes/env/RootContainer.dev'
import DevTools from '../../../../../main/10.real-world/src/uitls/DevTools'

const setup = () => {
  const props = {
    store: {
      entities: {
        'facebook/react': {
          id: 10270250,
          name: "react",
          fullName: "facebook/react",
          owner: "facebook",
        }
      },
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn()
    },
    history: {
      go: jest.fn()
    },
  }

  const renderer = new ShallowRenderer()

  renderer.render(
    <Root {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('RootContainer.dev', () => {
  it('should render correctly', () => {
    const {output, props} = setup()
    const div = output.props.children

    expect(output.type).toBe(Provider)
    expect(output.props.store).toBe(props.store)

    expect(div.type).toBe('div')

    const [p, router, devTools] = div.props.children

    expect(p.props.children).toEqual('Hide DevTools with Ctrl+H.')

    expect(router.type).toBe(Router)
    expect(router.props.history).toBe(props.history)
    expect(router.props.routes).toBe(routes)

    expect(devTools.type).toBe(DevTools)
  })
})