/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history.js";
import decode from "jwt-decode";
import "./Index.css";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import LoginPage from "views/Login/LoginPage";
import ProtectedLoginRoute from "ProtectedLoginRoute.js";
import axios from "axios";

import { AdminProvider } from "./context";

/* let user = localStorage.getItem('access_token')

axios.interceptors.request.use(request=>{
  console.log(request);
  request.headers.authorization = `Bearer ${user}`;
  return request;
}, error=>{
  console.log(error);
  return Promise.reject(error);
}) */

/* axios.interceptors.response.use(response=>{
  console.log(response);
  return response;
}, function (error){
  console.log(error);
  console.log("error found");
    const decoded = decode(localStorage.getItem('access_token'))
    console.log(decoded.exp)
    const originalRequest = error.config;
    console.log("error",originalRequest);
    if ( error.response.status === 401 && error.config && !error.config.__isRetryRequest || decoded.exp < (Date.now()/1000)-10000){
      console.log("big error");
    axios.post('https://martek.herokuapp.com/api/admin/auth/refresh-token',null)
      .then(res=>{
        console.log(res.data);
        if(res.data.statusCode === 200){
          localStorage.setItem('access_token',res.data.access_token);
          originalRequest.headers['Authorization'] = 'Bearer ' + res.data.access_token;
          return axios(originalRequest);
        }
      })       
      .catch(error=>{
        console.log("error again:",error);
        localStorage.clear();
        window.location.reload("/");
      })
  }
  
  return Promise.reject(error);
}
);
 */

ReactDOM.render(
  <AdminProvider>
  <Router history={history}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <ProtectedLoginRoute path="/" component={LoginPage}/>
      <Redirect from="/home" to="/admin/dashboard" />
    </Switch>
  </Router>
  </AdminProvider>,
  document.getElementById("root")
);
