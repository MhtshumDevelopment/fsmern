import React from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

const LoginComponent = ({authenticated,authenticateUser, history}) => <div> 
      <h2>Please Login!</h2>
      <form onSubmit={authenticateUser}>
        <input type="text" defaultValue="dev" placeholder="Enter Username" id="username" />
        <input type="password" defaultValue="Tuples" placeholder="Enter Password" id="password" />       
        <button type="submit">Login</button>
        {authenticated !== mutations.AUTHENTICATED 
        ?   <p> You're not authenticated</p>
        :  history.push("/dashboard")}
      </form>
    </div>


const mapStateToProps = ({session}) =>{
  return {  
  authenticated : session.authenticated
  };
};
const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e){
    e.preventDefault();
    let username = e.target['username'].value;
    let password = e.target['password'].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  }
});

export const ConnectedLogin = connect(mapStateToProps,mapDispatchToProps)(LoginComponent);