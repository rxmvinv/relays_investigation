import C from './constants';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

axios.interceptors.request.use(function(config) {

  const token = localStorage.authToken;

  if (token != null && (config.url !== `${C.API_URL}/${'users/login'}` || `${C.API_URL}/${'users/register'}` || `${C.API_URL}/${'relays/'}`)) {
    console.log(config)
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});

export const registerUser = ({login, email, password, image}) => {
  return dispatch => {
    dispatch({ type: C.REGISTER_USER })

    axios.post(`${C.API_URL}/${'users/register'}`, { login, email, password, image })
    .then(res => {
      console.log('Success registration');
      dispatch({ type: C.REGISTER_SUCCESS, response: res });
      //console.log(res);
      //localStorage.authToken = res.data.token
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: C.REGISTER_FAILURE, err: err });
    });
  }
}

export const offerRelay = ({confirmed, city, address, details, date, useremail, thumb, flow, map, mapdetails, panorama}) => {
  return dispatch => {
    dispatch({ type: C.OFFER_RELAY })

    axios.post(`${C.API_URL}/${'relays/'}`, {confirmed, city, address, details, date, useremail, thumb, flow, map, mapdetails, panorama}, {headers: {
      Authorization: 'Bearer '+ localStorage.authToken
    }})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  }
}

export const authorizationUser = (auth) => {

  return dispatch => {
    if (!auth._id) {
      var onRender;

      console.log('unathorized')
      var _id = jwtDecode(localStorage.authToken)._id;
      axios.post(`${C.API_URL}/${'users/' + _id}`, {
        token: localStorage.authToken
      })
      .then(res => {
          console.log('validating...');
          localStorage.authToken = res.data.token;
          clearTimeout(onRender)
          dispatch({
            type: C.AUTH_SUCCESS,
            isLoggedIn: true,
            authorizedUser: res.data.user
          })
      })
      .catch(err => {
        console.log(err)
        delete localStorage.authToken
        clearTimeout(onRender)
        dispatch({
          type: C.LOGOUT
        })
        dispatch({
          type: C.AUTH_FAILURE
        })
      });
    } else {
      console.log('authorized')
      onRender = setTimeout(() => dispatch({type: C.AUTHORIZATION_USER, authorizedUser: { _id: "", login: "", email: "", password: "", image: { data: "" }}}), 1200000);
    }
  }
}

export const removeUser = (_id) => {
  return dispatch => {
    dispatch({ type: C.REMOVE_USER })

    axios.delete(`${C.API_URL}/${'users/' + _id}`, {_id}, {headers: {
      Authorization: 'Bearer '+ localStorage.authToken
    }})
    .then(res => {
      console.log('Account deleted');
      dispatch({
        type: C.REMOVE_SUCCESS
      })
      delete localStorage.authToken
      //dispatch({
        //type: C.LOGOUT
      //})
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: C.REMOVE_FAILURE,
        errorMessage: err
      })
    });
  }
}


export const changeUser = ({_id, login, email, password, image}) => {
  return dispatch => {
    dispatch({ type: C.CHANGE_USER })

    axios.put(`${C.API_URL}/${'users/' + _id}`, { login, email, password, image }, {headers: {
      Authorization: 'Bearer '+ localStorage.authToken
    }})
    .then(res => {
      console.log(res);
      dispatch({
        type: C.CHANGE_SUCCESS
      })
      dispatch({
        type: C.LOGOUT
      })
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: C.CHANGE_FAILURE,
        errorMessage: err
      })
    });
  }
}

export const getRelays = ({dataRelays}) => {
  return dispatch => {
    dispatch({ type: C.GET_RELAYS })

    if (!dataRelays) {
      axios.get(`${C.API_URL}/${'relays/'}`)
      .then(res => {
          dispatch({
            type: C.RELAYS_SUCCESS,
            dataRelays: res.data
          })
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: C.RELAYS_FAILURE
        })
      });
    }
  }
}

export const getOneRelay = (_id) => ({
        type: C.CURRENT_RELAY,
        currentRelay: _id
    })

export const toggleClass = (cur) => ({
        type: C.TOGGLE_CLASS,
        toggle: (cur === 'hide') ? ('show') : ('hide')
    })

export const routeLocationDidUpdate = (loc) => ({
        type: C.ROUTE_UPDATE,
        toggle: 'hide',
        location: window.scrollTo(0, 0)
        //location: loc
    })

export const login = credentials => {
  return dispatch => {
    dispatch({
      type: C.LOGIN_REQUEST
    })
    axios.post(`${C.API_URL}/${'users/login/'}`, credentials).then(res => {
      localStorage.authToken = res.data.token

      dispatch({
        type: C.LOGIN_SUCCESS,
        user: jwtDecode(res.data.token)
      })
    }).catch(err => {
      dispatch({
        type: C.LOGIN_FAILURE,
        errorMessage: err//res.data.error
      })
    })
  }
}

export const logout = () => {
  delete localStorage.authToken
  return {
    type: C.LOGOUT,
    authorizedUser: {}
  }
}
