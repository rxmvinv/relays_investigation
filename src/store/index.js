import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { emptyUser, isLoggedIn, loadingList, redirToHome, redirToLogin, toggle, redirToRelays, redirBackToRelays, authorizedUser, signIn, dataRelays, currentRelay } from './reducers'
import stateData from '../data/initialState'

/*
var initialState = {
  "userForChange": { "_id": "", "login": "", "email": "", "password": "", "image": "", "passwordsec": "", "distinctPass": ""},
  "sure": false,
  "emptyUser": { "login": "", "email": "", "password": "", "image": "", "passwordsec": "", "distinctPass": false },
};
*/

const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

const saver = store => next => action => {
    let result = next(action)
    localStorage['relays-investigation'] = JSON.stringify(store.getState())
    return result
}

const storeFactory = (initialState=stateData) =>
    applyMiddleware(logger, saver, reduxThunk)(createStore)(
        combineReducers({ emptyUser, isLoggedIn, toggle, loadingList, redirToHome, redirToLogin, redirToRelays, redirBackToRelays, authorizedUser, signIn, dataRelays, currentRelay}),
        (localStorage['relays-investigation']) ?
            JSON.parse(localStorage['relays-investigation']) :
            stateData
    )

export default storeFactory
