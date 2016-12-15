export const stargazers = [
  {
    login: "goatslacker",
    id: 10632,
    repos_url: "https://api.github.com/users/goatslacker/repos",
    type: "User"
  },
  {
    login: "iamxande",
    id: 193051,
    repos_url: "https://api.github.com/users/iamxande/repos",
    type: "User"
  }
]

export const response = {
  headers: {
    get: () => '<https://api.github.com/repositories/10270250/stargazers?access_token=4b2e139b5f63ca86657f0dbbc6d10ea16100616e&page=2>; rel="next", <https://api.github.com/repositories/10270250/stargazers?access_token=4b2e139b5f63ca86657f0dbbc6d10ea16100616e&page=1334>; rel="last"'
  }
}