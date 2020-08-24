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
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(()=>{
    setIsActive(true)
    axios.get("https://martek.herokuapp.com/api/admin",
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

  const handleUpdate=()=>{
    console.log("yub")
  }
  const classes = useStyles();
  return (
    <div>
    <LoadingOverlay
    active={isActive}
    spinner={<PulseLoader color={'#4071e1'}/>}
    color
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
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
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>

                <GridItem xs={12} sm={12} md={6}>
                  <Input
                    placeholder="Email"
                    value={email}
                    style={{width:"100%",marginBottom:"40px"}}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                
                <GridItem xs={12} sm={12} md={6}>
                  <Input
                    placeholder="Phone"
                    value={phone}
                   style={{width:"100%",marginBottom:"40px"}}
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
              <Button color="primary" onClick={()=>handleUpdate()}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </LoadingOverlay>
    </div>
  );
}
