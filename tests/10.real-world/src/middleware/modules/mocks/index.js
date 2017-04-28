import ACCESSTOKEN from '../../../../../../main/10.real-world/src/constants/Github'

const nextUrl = '<https://api.github.com/repositories/10270250/stargazers?access_token=' + ACCESSTOKEN + '&page=2>'
const lastUrl = '<https://api.github.com/repositories/10270250/stargazers?access_token=' + ACCESSTOKEN + '&page=1334>'

const jsonMocked = {
  id: 10270250,
  name: "react",
  full_name: "facebook/react",
  owner: {
    login: "facebook",
    id: 69631,
    type: "Organization",
  },
  description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
  created_at: "2013-05-24T16:15:54Z",
  updated_at: "2016-12-15T13:30:40Z",
  pushed_at: "2016-12-15T11:51:48Z",
  svn_url: "https://github.com/facebook/react",
  homepage: "https://facebook.github.io/react/"
}

const response = {
  headers: {
    get: (link) => nextUrl + '; rel="next", ' + lastUrl + '; rel="last"'
  },
  ok: true,
  json: () => Promise.resolve(jsonMocked)
}

const mocks = {
  jsonMocked: jsonMocked,

  response: response,

  fetch: {
    _fetch: url => Promise.resolve(response)
  }
}

export default mocks