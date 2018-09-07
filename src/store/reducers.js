import C from '../constants';
import jwtDecode from 'jwt-decode';

export const emptyUser = (state = {}, action) => {
    switch (action.type) {
        case C.REGISTER_SUCCESS:
            return {response: action.response}
        case C.REGISTER_FAILURE:
            return action.err
        case C.ROUTE_UPDATE:
            return {response:{status: ''}}
        case C.LOGIN_SUCCESS:
            return {response: {status: 'ok'}}
        case C.LOGIN_FAILURE:
            return action.errorMessage
        case C.CHANGE_SUCCESS:
            return {response: {status: 'ok'}}
        case C.CHANGE_FAILURE:
            return action.errorMessage
        case C.REMOVE_SUCCESS:
            return {response: {status: 'ok'}}
        case C.REMOVE_FAILURE:
            return action.errorMessage
        case C.LOGOUT:
            return {response:{status:""}}
        default :
            return state
    }
}

export const isLoggedIn = (state = false, action) => {
    switch (action.type) {
        case C.AUTHORIZATION_USER:
            return false
        case C.AUTH_FAILURE:
            return false
        case C.AUTH_SUCCESS:
            return true
        case C.LOGIN_SUCCESS:
            return true
        case C.LOGOUT:
            return false
        default :
            return state
    }
}

export const dataRelays = (state = [], action) => {
    switch (action.type) {
        case C.GET_RELAYS:
            return state
        case C.RELAYS_SUCCESS:
            return action.dataRelays
        case C.RELAYS_FAILURE:
            return state
        default :
            return state
    }
}


export const currentRelay = (state = {}, action) => {
    switch (action.type) {
        case C.CURRENT_RELAY:
        console.log(action.currentRelay)
            return action.currentRelay
        default :
            return state
    }
}


const authInitialState = (token) => {
   var authorizedUser = token ? jwtDecode(token) : {"_id": "", "login": "", "email": "", "password": "", "image": {"data": ""}};

   return authorizedUser;
}

export const authorizedUser = (state = authInitialState, action) => {
    switch (action.type) {
        case C.AUTHORIZATION_USER:
            return action.authorizedUser
        case C.AUTH_FAILURE:
            return {...state}
        case C.AUTH_SUCCESS:
            return action.authorizedUser
        case C.CHANGE_USER:
            return (state._id !== action._id) ?
              state :
              {
                ...state,
                login: action.login,
                email: action.email,
                password: action.password,
                image: action.image
              }
        case C.REMOVE_USER:
            return (state._id !== action._id) ?
              state :
              {
                ...state,
                _id: '',
                login: '',
                email: '',
                password: '',
                image: {data: ''}
              }
        case C.REMOVE_SUCCESS:
            return {}
        case C.LOGOUT:
            return {}
        default :
            return state
    }
}

const loginInitialState = (token => ({
  isAuthenticating: false,
  currentUser: token ? jwtDecode(token) : null,
  errorMessage: null
}))(localStorage.authToken)

export const signIn = (state = loginInitialState, action = {}) => {
  switch (action.type) {
    case C.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true
      }
    case C.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        errorMessage: action.errorMessage
      }
    case C.LOGIN_SUCCESS:
      return {
        isAuthenticating: false,
        currentUser: action.user,
        errorMessage: null
      }
    case C.LOGOUT:
      return {
        isAuthenticating: false,
        currentUser: null,
        errorMessage: null
      }
    default:
      return state
  }
}

export const redirToHome = (state = false, action) => {
    switch (action.type) {
        case C.AUTH_SUCCESS:
            return false
        case C.LOGIN_SUCCESS:
            return false
        case C.ROUTE_UPDATE:
            return false
        case C.LOGOUT:
            return true
        default :
            return state
    }
}

export const redirToLogin = (state = false, action) => {
    switch (action.type) {
        case C.REGISTER_SUCCESS:
            return true
        case C.REGISTER_FAILURE:
            return false
        case C.LOGOUT:
            return false
        default :
            return state
    }
}

export const redirBackToRelays = (state = false, action) => {
    switch (action.type) {
        case C.RELAYS_SUCCESS:
            return false
        case C.OFFER_RELAY:
            return true
        default :
            return state
    }
}

export const redirToRelays = (state = false, action) => {
    switch (action.type) {
        case C.AUTH_SUCCESS:
            return true
        case C.LOGIN_SUCCESS:
            return true
        case C.LOGOUT:
            return false
        default :
            return state
    }
}

export const loadingList = (state = false, action) => {
    switch (action.type) {
        case C.GET_RELAYS:
            return true
        case C.RELAYS_SUCCESS:
            return false
        case C.RELAYS_FAILURE:
            return false
        default :
            return state
    }
}

export const toggle = (state = false, action) => {
    switch (action.type) {
        case C.TOGGLE_CLASS:
            return action.toggle
        case C.ROUTE_UPDATE:
            return action.toggle
        default :
            return state
    }
}
