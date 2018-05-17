import { postJson, getJson } from './util'

export const login = data => postJson('login', data)

export const getProfile = profileId => getJson(`profiles/${profileId}`)

export const submitResponses = responses => postJson('responses', responses)
