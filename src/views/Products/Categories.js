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
  
 

const useStyles = makeStyles(styles);
 
export default function Categories(props) {
    
  const classes = useStyles();
  const [categories, setCategories] = React.useState([]);

  React.useEffect(()=>{
    axios.get("https://martek.herokuapp.com/api/categories")
    .then(res=>{
        console.log(res.data);
        setCategories(res.data)
    })
},[])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Product Categories</h4>
        <p className={classes.cardCategoryWhite}>
         Select A Category To View Products
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
        {categories.map((value)=>(
          <GridItem md="6">
          <div  key={value.id} style={{cursor:"pointer"}} onClick={()=>{props.history.push("/admin/products",{id:value.id, name:value.category})}}>
          <SnackbarContent  message={value.category} />
          </div>
          </GridItem>
        ))}
        </GridContainer>
      </CardBody>
    </Card>
      </GridItem>
    </GridContainer>
  );
}
