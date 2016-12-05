import React from 'react'
import {renderToString} from 'react-dom/server'

import * as constants from '../../../../../main/09.universal/src/asset/constants'
import {template} from '../../../../../main/09.universal/src/server/modules/template'

describe('template', () => {
  it('should return the correct string', () => {
    const html = renderToString(
      <div>
        <h1>test</h1>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    )

    const state = {
      counter: 1
    }

    const expectedValue = `
    <!doctype html>
    <html>
      <head>
        <title>Universal Example</title>
      </head>
      <body>
        <div id="${constants.id}">${html}</div>
        <script>
          window.${constants.globalProp} = ${JSON.stringify(state).replace(/</g, '\\x3c')}
        </script>
        <script src="${constants.publicPath}${constants.filename}"></script>
      </body>
    </html>
    `

    let receivedValue = template(html, state)

    expect(receivedValue).toEqual(expectedValue)
  })
})