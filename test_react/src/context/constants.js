export const apiUrl =process.env.NODE_ENV!=='production'?
'http://localhost:5000/api'
:'somedeployedURL'
export const LOCAL_STORAGE_TOKEN_NAME ='login'

export const PLANS_LOADED_SUCCESS = 'PLANS_LOADED_SUCCESS'
export const PLANS_LOADED_FAIL = 'PLANS_LOADED_FAIL'
export const ADD_PLAN = 'ADD_PLAN'
export const DELETE_PLAN = 'DELETE_PLAN'
export const UPDATE_PLAN = 'UPDATE_PLAN'
export const FIND_PLAN = 'FIND_PLAN'
