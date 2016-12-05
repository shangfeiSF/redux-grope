import React from 'react'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'

import createStore from '../../../../../main/09.universal/src/client/store/createStore'
import AppContainer from '../../../../../main/09.universal/src/client/containers/AppContainer'

import {template} from '../../../../../main/09.universal/src/server/modules/template'
import {renderMiddleware} from '../../../../../main/09.universal/src/server/modules/renderMiddleware'

describe('renderMiddleware', () => {
  it('should response with the query of request', () => {
    const counter = 99
    const html = renderToString(
      <Provider store={createStore({counter})}>
        <AppContainer />
      </Provider>
    )

    const expectedValue = template(html, {counter})

    const req = {
      query: {
        counter: counter
      }
    }
    const res = {
      send: data => {
        expect(data).toEqual(expectedValue)
      }
    }

    renderMiddleware(req, res)
  })
})