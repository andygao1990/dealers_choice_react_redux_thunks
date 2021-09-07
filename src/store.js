import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

const SET_VIEW = 'SET_VIEW'
const LOAD = 'LOAD'
const UPDATE = 'UPDATE'
const CREATE = 'CREATE'

const view = (state = '', action) => {
    if (action.type === SET_VIEW) {
        return action.view
    }
    return state
}

const users = (state = [], action) => {
    if (action.type === LOAD) {
        return action.users
    }
    if (action.type === UPDATE) {
        return state.map(user => user.id === action.user.id ? action.user : user)
    }
    if (action.type === CREATE) {
        return [...state, action.user]
    }
    return state
}

const store = createStore(
    combineReducers(
        {view,users}
    ),
    applyMiddleware(logger, thunk)
)

export const fetchUsers = () => {
    return async (dispatch) => {
        const { data: users } = await axios.get('/api/users')
        dispatch({
            type: LOAD,
            users
        })
    }
}

export const updateUser = (user) => {
    return async (dispatch) => {
        const { data: updated } = await axios.put(`/api/users/${user.id}`, {attendance: !user.attendance})
        dispatch({
            type: UPDATE,
            user: updated
        })
    }
}

export const create = (name) => {
    return async (dispatch) => {
        const { data: newUser } = await axios.post(`/api/users/${name ? '':'random'}`, name ? {name}:null)
        dispatch({
            type: CREATE,
            user: newUser
        })
    }
}

export const setView = (view) => {
    return {
        type: SET_VIEW,
        view
    }
}

export default store