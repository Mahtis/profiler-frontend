import { postJson, getJson } from './util'

export const login = data => postJson('login', data)

export const getProfile = profileId => getJson(`profiles/${profileId}`)

export const getUserProfiles = () => getJson('profiles')

export const getUserResponses = () => getJson('responses')

export const submitResponses = responses => postJson('responses', responses)
