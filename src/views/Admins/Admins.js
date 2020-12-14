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
import axios from "axios";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  },
  table: {
    minWidth: 700,
  },
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(styles);

let user = localStorage.getItem('access_token');
 
export default function Admins() {
  const classes = useStyles();
  const [admins, setAdmins] = React.useState([]);
  const [isActive, setIsActive] = React.useState(true);

  React.useEffect(()=>{
    setIsActive(true);
    axios.get("https://backend-api.martekgh.com/api/admin/fetch-admins",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      setAdmins(res.data);
      setIsActive(false)
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  },[])


  const handleBlockAdmin=(id)=>{
    let tempAdmins = [...admins];
    axios.post("https://backend-api.martekgh.com/api/admin/"+id+"/block",null,
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      if(res.data.message === "blocked"){
        let selected = tempAdmins.find(item=>item.id === id);
        selected.isActive = false;
        setAdmins(tempAdmins);
      }
    })
  }

  const handleUnBlockAdmin=(id)=>{
    let tempAdmins = [...admins];
    axios.post("https://backend-api.martekgh.com/api/admin/"+id+"/unblock",null,
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      if(res.data.message === "unblocked"){
        let selected = tempAdmins.find(item=>item.id === id);
        selected.isActive = true;
        setAdmins(tempAdmins)
      }
    })
  }
  return (
    <GridContainer>
    {!isActive?
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
          <GridContainer>
            <GridItem xs={6} sm={6} md={6} lg={6}>
            <h4 className={classes.cardTitleWhite}>
              All Admins 
            </h4>
            </GridItem>
          </GridContainer>
            

            
          </CardHeader>
          <CardBody>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Admin Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">email</StyledTableCell>
                <StyledTableCell align="center">Last_login </StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
            {admins.map(value=>(
              <StyledTableRow >
                  <StyledTableCell align="center">{value.id}</StyledTableCell>
                  <StyledTableCell align="center">{value.name}</StyledTableCell>
                  <StyledTableCell align="center">{value.email}</StyledTableCell>
                  <StyledTableCell align="center">{value.last_login}</StyledTableCell>
                  <StyledTableCell align="center" className={classes.tableActions}>
                  {value.isActive?
                  <Tooltip
                    id="tooltip-top-block"
                    title="Block Admin"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                  
                    <IconButton
                      color="secondary"
                      aria-label="Block"
                      className={classes.tableActionButton}
                      onClick={()=>handleBlockAdmin(value.id)}
                    >
                      <LockIcon
                        color="secondary"
                        className={
                          classes.tableActionButtonIcon + " " + classes.edit
                        }
                      />
                    </IconButton>
                    </Tooltip>
                    :
                    <Tooltip
                    id="tooltip-top-unblock"
                    title="Unblock Admin"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    onClick={()=>handleUnBlockAdmin(value.id)}
                    >
                    <IconButton
                      color="success"
                      aria-label="Unblock"
                      className={classes.tableActionButton}
                    >
                      <LockOpenIcon
                        color="success"
                        className={
                          classes.tableActionButtonIcon + " " + classes.edit
                        }
                    />
                  </IconButton>
                </Tooltip>
                }
              <Tooltip
                id="tooltip-top-start"
                title="Delete User"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  color="secondary"
                  aria-label="Close"
                  className={classes.tableActionButton}
                >
                  <Close
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
              </Tooltip>
            </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
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
