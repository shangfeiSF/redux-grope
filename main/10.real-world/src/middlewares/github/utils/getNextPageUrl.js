export  default response => {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const next = link.split(',').find(item => item.indexOf('rel="next"') > -1)
  if (!next) {
    return null
  }

  return next.split(';')[0].slice(1, -1)
}