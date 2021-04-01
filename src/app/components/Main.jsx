import React from 'react';
import { Provider } from 'react-redux';
// diff. b/w Router & BrowserRouter
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { ConnectedNavigation } from './Navigation';
import { store } from '../store';
import {ConnectedDashboard}  from './Dashboard';
import {ConnectedTaskDetail}  from './TaskDetail';
import { ConnectedLogin } from './Login';

// a method take component as argument going to return another method that will take an  obj. as arg. destructing that one
const RouteGuard = Component => ({match}) => {
  console.info("Route Gaurd", match);
  //return <Component match={match} />;
  if(!store.getState().session.authenticated){
    return <Redirect to="/" />
  }else{
    // below is to use jsx termed as returning jsx i.e. <component/> using markup syntax
    return <Component match={match} />;
  }
};

export const Main = () => {
  return (
    <Router>
      <Provider store={store}>
        <div>
          <ConnectedNavigation />          
          <Switch>            
            <Route 
              exact 
              path="/" 
              component={ConnectedLogin}       
            />  
            <Route 
              exact 
              path='/dashboard' 
              render={RouteGuard(ConnectedDashboard)}        
            />  
            <Route           
              exact
              path='/task/:id' 
              render={RouteGuard(ConnectedTaskDetail
              )}        
            />  
          </Switch>  
        </div>  
      </Provider>
    </Router>  
  );
};