import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const AuthRoute = ({component:Component , authenticated , path}) =>(
    <Route 
    to ={path}
    render={(props) =>
    authenticated === true ? <Redirect to='/' />:<Component {...props}/>
    }
    />
);

const mapStateToProps = (state) => ({
    authenticated:state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);