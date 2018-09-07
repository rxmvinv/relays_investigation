import { connect } from 'react-redux';
//import { compose } from 'redux';
import Menu from './ui/Menu';
import Home from './ui/Home';
import LoginForm from './ui/LoginForm';
import RegisterForm from './ui/RegisterForm';
import RelaysList from './ui/RelaysList';
import RelayDetailed from './ui/RelayDetailed';
import OfferForm from './ui/OfferForm';
import Footer from './ui/Footer';
import UserCredentialsForm from './ui/UserCredentialsForm';
import { getRelays, getOneRelay, login, logout, toggleClass, routeLocationDidUpdate, registerUser, offerRelay, changeUser, removeUser, authorizationUser } from '../actions'

export const RegisterUser = connect(
    state =>
        ({
            redirToLogin: state.redirToLogin,
            emptyUser: state.emptyUser
        }),
    dispatch =>
        ({
            registerNewUser(createdUser) {
                dispatch(registerUser(createdUser))
            }
        })
)(RegisterForm)

export const LoginUser = connect(
    state =>
        ({
            redirToRelays: state.redirToRelays,
            status: state.emptyUser.response.status
        }),
    dispatch =>
        ({
            loginUser(userCreds) {
                dispatch(login(userCreds))
            }
        })
)(LoginForm)

export const OfferRelay = connect(
  state =>
      ({
          useremail: state.authorizedUser.email,
          redirBackToRelays: state.redirBackToRelays,
          isLoggedIn: state.isLoggedIn
      }),
  dispatch =>
      ({
          offerNewRelay(relayForm) {
              dispatch(offerRelay(relayForm))
          }
      })
)(OfferForm)

export const UserCredsChange = connect(
  state =>
      ({
          _id: state.authorizedUser._id,
          login: state.authorizedUser.login,
          email: state.authorizedUser.email,
          image: state.authorizedUser.image,
          status: state.emptyUser.response.status,
          isLoggedIn: state.isLoggedIn
      }),
  dispatch =>
      ({
          changeCurrentUser(changedUser) {
              dispatch(changeUser(changedUser))
          },
          removeCurrentUser(curuser_id) {
              dispatch(removeUser(curuser_id))
          }
      })
)(UserCredentialsForm)

export const MainMenu = connect(
  state =>
      ({
          isLoggedIn: state.isLoggedIn,
          authorizedUser: state.authorizedUser,
          currentUser: state.signIn.currentUser,
          redirToHome: state.redirToHome,
          toggle: state.toggle
      }),
  dispatch =>
      ({
          logoutUser() {
              dispatch(logout())
          },
          toggleProfile(cur) {
              dispatch(toggleClass(cur))
          }
      })
)(Menu)

export const FooterAuth = connect(
  state =>
      ({
          authorizedUser: state.authorizedUser,
          signedUser: state.signIn.currentUser
      }),
  dispatch =>
      ({
          authorizeUser(auth) {
              dispatch(authorizationUser(auth))
          },
          locationUpdate(loc) {
            dispatch(routeLocationDidUpdate(loc))
          }
      })
)(Footer)

export const Relays = connect(
  state =>
      ({
          isLoggedIn: state.isLoggedIn,
          dataRelays: state.dataRelays
      }),
  dispatch =>
      ({
          getRelaysData(rlsLst) {
              dispatch(getRelays(rlsLst))
          }
      })
)(RelaysList)

const findById = (datRel, relayId) => {
  var filtered = datRel.filter(item => item._id === relayId);
  filtered = filtered[0];
  return filtered;
};

//state.match.params.relay_id
export const OneRelay = connect(
  state => ({
      currentRelay: findById(state.dataRelays, state.currentRelay)
  }),
  dispatch =>
    ({
        getCurrentRelay(id) {
            dispatch(getOneRelay(id))
        }
    })
)(RelayDetailed)


export const HomePage = connect(
  state =>
      ({
          isLoggedIn: state.isLoggedIn,
          authorizedUser: state.authorizedUser
      })
)(Home)

/*
export const Colors = connect(
    ({colors}, {match}) =>
        ({
            colors: sortColors(colors, match.params.sort)
        }),
    dispatch =>
        ({
            onRemove(id) {
                dispatch(removeColor(id))
            },
            onRate(id, rating) {
                dispatch(rateColor(id, rating))
            }
        })
)(ColorList)
*/
