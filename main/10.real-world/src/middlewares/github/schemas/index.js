import {schema} from 'normalizr';

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.login
})

const repoSchema = new schema.Entity('repos', {}, {
  idAttribute: repo => repo.fullName
})

repoSchema.define({
  owner: userSchema
})

export default {
  USER: userSchema,
  USER_ARRAY: new schema.Array(userSchema),
  REPO: repoSchema,
  REPO_ARRAY: new schema.Array(repoSchema)
}