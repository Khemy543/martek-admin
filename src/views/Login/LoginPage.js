import React from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Input from "@material-ui/core/Input";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { Button } from "@material-ui/core";

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

export default function LoginPage() {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [error,setError] =React.useState(false);

  const handleSubmit=(e)=>{
      console.log("handling");
      e.preventDefault()
      if(email !== "" && password !== ""){
        setIsActive(true)
      axios.post("http://backend-api.martekgh.com/api/admin/auth/login",
      {
        email, password
      })
      .then(res=>{
          console.log(res.data);
          if(res.data.statusCode === 200){
              localStorage.setItem('access_token',res.data.access_token);
              window.location.reload("/");

          }
      })
      .catch(error=>{
          console.log(error);
          setError(true);
          setIsActive(false)
      })
    }
  }

  return (
    <div  style={{ overflowX:"hidden"}}>
        <GridContainer>
            <GridItem md={4} sm={12} xs={12} style={{marginRight:"auto" ,marginLeft:"auto",marginTop:"25vh"}}>
            
            <form onSubmit={handleSubmit}>
            {error?
            <Alert severity="error">Inncorrect Credentials</Alert>:
            <div></div>}
            <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>ADMIN LOGIN</h4>
            </CardHeader>
            <CardBody>
            <div>
            <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                style={{width:"90%"}}
                required
                />
            </div>
            <div style={{marginTop:"40px"}}>
            <Input
                placeholder="Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                style={{width:"90%"}}
                type="password"
                required
                />
            </div>
            </CardBody>
            <CardFooter>
{/*               <Button color="primary"  onClick={()=>handleSubmit()} >{!isActive?<>SIGN</>:<CircularProgress color="secondary" style={{width:"15px",height:"15px",marginLeft:"5px"}}/>}</Button>
 */}            
    <Button color="primary" type='submit'  >{!isActive?<>SIGN IN</>:<CircularProgress color="secondary" style={{width:"15px",height:"15px",marginLeft:"5px"}}/>}</Button>
 </CardFooter>
          </Card>
          <p style={{textAlign:"center", fontSize:"11px", color:"#0066ffc2"}}>@martek 2020</p>
          </form>
            </GridItem>
        </GridContainer>
         
    </div>
  );
}
