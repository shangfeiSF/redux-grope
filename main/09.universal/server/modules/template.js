import * as constants from '../../asset/constants'

export const template = (html, state) => {
  return `
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
}