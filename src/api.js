import { postJson, getJson } from './util'

export const submitRegister = data => postJson('accounts/register', data)

export const login = data => postJson('login', data)

export const getUser = () => getJson('accounts')

export const getProfile = profileId => getJson(`profiles/${profileId}`)

export const getUserProfiles = () => getJson('profiles')

export const getUserResponses = () => getJson('responses')

export const submitResponses = responses => postJson('responses', responses)

export const getQuestions = () => getJson('questions')

export const submitNewProfile = (data) => postJson('profiles', data)
