import React from 'react'
import { Route,Redirect } from 'react-router-dom';

        
let isAuthenticated = localStorage.getItem('access_token');
class ProtectedLoginRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const path = this.props.path;
        
        if(isAuthenticated !== null){
            return (
                <Redirect to={{ pathname: '/admin/dashboard' }} />
        )} 
        else{
        return(
            <Route path ={path} component={Component} />
        )}
    }
}

export default ProtectedLoginRoute;  