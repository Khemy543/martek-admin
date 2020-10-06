import React from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";
import Input from "@material-ui/core/Input";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Visibility from "@material-ui/icons/Visibility";
import Close from "@material-ui/icons/Close";
import Popover from '@material-ui/core/Popover';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };
  
 
let user = localStorage.getItem("access_token");
const useStyles = makeStyles(styles);
 
export default function AddAds(props) {
    
  const classes = useStyles();
  const [ads, setAds] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);
  const [id, setId] = React.useState(1);
  const [campuses, setCampuses]=React.useState([]);
  const [file, setFile] = React.useState("")



  React.useEffect(()=>{
    axios.get("https://martek.herokuapp.com/api/campuses")
    .then(res=>{
        console.log(res.data);
        setCampuses(res.data)
    })
    .catch(error=>{
        console.log(error.response.data)
    })
  },[])

 const addAdd=(e)=>{
     e.preventDefault()
    let BodyForm = new FormData();
    BodyForm.append('image_path',file);
    axios.post("https://martek.herokuapp.com/api/admin/campus/"+id+"/carousel-images",BodyForm,
    {headers:{
        "Authorization":`Bearer ${user}`,
        "Content-Type":"mutipart/form-data"
    }})
    .then(res=>{
        console.log(res.data);
        alert("saved");
        setFile(null)
    })
    .catch(error=>{
        console.log(error.response.data)
    })
 }

  return (
    <GridContainer>
    {!isActive?
      <GridItem xs={12} sm={12} md={6} style={{marginLeft:"auto", marginRight:"auto"}}>
      <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Add Ads</h4>
      </CardHeader>
      <CardBody>
      <form onSubmit={addAdd}>
        <GridContainer>
        <GridItem>
            <Input type="file" onChange={e=>setFile(e.target.files[0])}/>
        </GridItem>
        <GridItem>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id}
                onChange={e => setId(e.target.value)}
            >
                {campuses.map(value => <MenuItem value={value.id} key={value.id}>{value.campus}</MenuItem>)}
                </Select>
        </GridItem>
        <GridItem>
            <Button color="primary" type="submit">Add</Button>
        </GridItem>
        </GridContainer>
        </form>
      </CardBody>
    </Card>
      </GridItem>
      :
      <GridItem md={6} style={{marginLeft:"auto",marginRight:"auto",fontWeight:"bold"}}>
     Please Wait <CircularProgress style={{width:"15px",height:"15px",marginLeft:"5px"}}/>
      </GridItem>}
    </GridContainer>
  );
}
