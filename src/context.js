import React from "react";
import axios from "axios";
import decode from "jwt-decode";

const AdminContext = React.createContext();

let user =localStorage.getItem('access_token');
class AdminProvider extends React.Component{

    state={
        allShops:[],
        allUsers:[],
        isSuperAdmin:false
    }

    componentDidMount(){/* 
        localStorage.clear() */
        this.isTokenExpired();

        axios.get("http://backend-api.martekgh.com/api/admin",
        {headers:{"Authorization":`Bearer ${user}`}})
        .then(res=>{
          console.log(res.data);
          if(res.data.role !== "super_admin" && res.data.must_change_password === true){
            console.log(this.props.children.props.history.push("/admin/change-password"))
          }
          else{
              if(res.data.role === "super_admin"){
                  return this.setState({isSuperAdmin:true})
              }
          }
      })
    }

     isTokenExpired=()=>{
        try {
            const decoded = decode(user);/* 
            console.log(decoded.exp, (Date.now()/1000)-120) */
            if (decoded.exp < (Date.now() / 1000)) { // Checking if token is expired.
                localStorage.clear();
                window.location.reload("/")
            }
        }
        catch (err) {
            return false;
        }
    }

    render(){
        return(
            <AdminContext.Provider value={{
                ...this.state,
                logout:this.logout
            }}>
            {this.props.children}
            </AdminContext.Provider>
        );
    }
}

const AdminConsumer = AdminContext.Consumer;



export {AdminProvider,AdminConsumer};