//App.js
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { MainMenu, HomePage, LoginUser, RegisterUser, Relays, OneRelay, OfferRelay, UserCredsChange, FooterAuth } from './containers'
import NotFound from './ui/NotFound';
import '../stylesheets/APP.scss'

const App = ({location}) =>
        <div>
          <MainMenu />
          <div className="mainContent">
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <Switch location={location}>
                  <Route exact path='/' render={() => <HomePage />}/>
                  <Route path='/login' render={() => <LoginUser />} />
                  <Route path='/register' render={() => <RegisterUser />}  />
                  <Route exact path='/relays/' render={() => <Relays />}/>
                  <Route exact path='/relays/:relay_id' render={() => <OneRelay /> } />
                  <Route path='/offer-relay' render={() => <OfferRelay />} />
                  <Route path='/change-credentials' render={() => <UserCredsChange />} />
                  <Route path='/not-found' render={() => <NotFound />}/>
                  <Route component={NotFound} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <FooterAuth />
        </div>


export default withRouter(App);
