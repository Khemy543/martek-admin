import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Input from "@material-ui/core/Input";
import LoadingOverlay from 'react-loading-overlay';
import PulseLoader from "react-spinners/PulseLoader";

import avatar from "assets/img/faces/marc.jpg";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);
let user = localStorage.getItem('access_token')
export default function UserProfile() {
  const[name, setName] = React.useState("");
  const[email, setEmail] = React.useState("");
  const[phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);

  React.useEffect(()=>{
    setIsActive(true)
    axios.get("https://backend-api.martekgh.com/api/admin",
  {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      setName(res.data.name)
      setEmail(res.data.email)
      setPhone(res.data.phone);
      setRole(res.data.role)
      setIsActive(false);
    })
    
  },[])

  const handleUpdate=(e)=>{
    e.preventDefault();
    console.log("....")
    axios.patch("https://backend-api.martekgh.com/api/admin/update",
    {
      name:name,
      email:email,
      phone:phone,
      role:role
    },
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      alert("Updated!")
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
      {!isActive?
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <form onSubmit={handleUpdate}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Update your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                
                <GridItem xs={12} sm={12} md={6}>
                  <Input
                    placeholder="User Name"
                    id="email-address"
                    value={name}
                    style={{width:"100%",marginBottom:"40px",marginTop:"20px"}}
                    onChange={e=>setName(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>

                <GridItem xs={12} sm={12} md={6}>
                  <Input
                    placeholder="Email"
                    value={email}
                    style={{width:"100%",marginBottom:"40px"}}
                    onChange={e=>setEmail(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                
                <GridItem xs={12} sm={12} md={6}>
                  <Input
                    placeholder="Phone"
                    value={phone}
                   style={{width:"100%",marginBottom:"40px"}}
                   onChange={e=>setPhone(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                
                <GridItem xs={12} sm={12} md={6}>
                  <Input
                    placeholder="Role"
                    value={role}
                   style={{width:"100%",marginBottom:"40px"}}
                   disabled
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit">Update Profile</Button>
            </CardFooter>
              </form>
          </Card>
        </GridItem>
        :
        <GridItem md={6} style={{marginLeft:"auto",marginRight:"auto",fontWeight:"bold"}}>
     Please Wait <CircularProgress style={{width:"15px",height:"15px",marginLeft:"5px"}}/>
      </GridItem>
      }
      </GridContainer>
    </div>
  );
}
