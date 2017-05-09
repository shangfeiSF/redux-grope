import {Schema, arrayOf} from 'normalizr'

const userSchema = new Schema('users', {
  idAttribute: user => user.login
})

const repoSchema = new Schema('repos', {
  idAttribute: repo => repo.fullName
})

repoSchema.define({
  owner: userSchema
})

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  REPO: repoSchema,
  REPO_ARRAY: arrayOf(repoSchema)
}