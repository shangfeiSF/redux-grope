export default spec => {
  const {route, schema, types} = spec

  if (!(typeof route === 'string' || typeof route === 'function')) {
    throw new Error('route must be a string or a function to specify a part of URL.')
  }

  if (!schema) {
    throw new Error('schema must be existed to specify the exported.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('types must be an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('each type must be a string.')
  }
}