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
import { Container } from "@material-ui/core";

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
let user = localStorage.getItem('access_token');


export default function AddAdmin() {
  const [isActive, setIsActive] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("")

  const hanldeSubmit=()=>{
    if(name !== "" || email !=="" || phone !==""){
    axios.post("https://martek.herokuapp.com/api/admin/add-new-admin",
    {name,phone,email},
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
    })
    .catch(error=>{
      console.log(error)
    })
}
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
        <GridItem xs={12} sm={12} md={10} style={{marginLeft:"auto", marginRight:"auto"}}>
          <Card>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Add a new Administrator
            </h4>
          </CardHeader>
          <CardBody>
              <Container>
                  <form>
                  <GridContainer>
                      <GridItem md={6}>
                      <Input
                          placeholder="Admin Name"
                          style={{width:"80%", marginTop:"20px"}}
                          value={name}
                          onChange={e=>setName(e.target.value)}
                      />
                      </GridItem>
                      <GridItem md={6}>
                      <Input
                          placeholder="Email"
                          style={{width:"80%", marginTop:"20px"}}
                          value={email}
                          onChange={e=>setEmail(e.target.value)}
                      />
                      </GridItem>

                  </GridContainer>

                  <GridContainer>
                      <GridItem md={6}>
                      <Input
                          placeholder="Phone"
                          style={{width:"80%",marginTop:"35px"}}
                          value={phone}
                          onChange={e=>setPhone(e.target.value)}
                      />
                      </GridItem>
                      <GridItem md={6}>
                      <Input
                          placeholder="Role"
                          style={{width:"80%",marginTop:"35px"}}
                          value="Admin"
                      />
                      </GridItem>

                  </GridContainer>
                  <Button
                  color="primary"
                  onClick={()=>hanldeSubmit()}
                  style={{marginTop:"40px"}}
                  >
                      Create
                  </Button>
                  </form>
              </Container>
          </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </LoadingOverlay>
    </div>
  );
}
