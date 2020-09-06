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

import Visibility from "@material-ui/icons/Visibility";
import Close from "@material-ui/icons/Close";
import axios from "axios";
import Pagination from '@material-ui/lab/Pagination';
import _ from "lodash";
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Button from "components/CustomButtons/Button.js";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';


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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



const useStyles = makeStyles((theme)=>({
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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}));

let user = localStorage.getItem('access_token');

export default function Users() {
  const classes = useStyles();

  const [users, setUsers] = React.useState([]);
  const [copyUsers,setCopyUsers] = React.useState([])
  const [isActive ,setIsActive] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [deleteId,setId]=React.useState(0)
  const [open, setOpen] = React.useState(false);
  const [blocked,setBlock]=React.useState(false)

  React.useEffect(()=>{
    setIsActive(true)
    axios.get("http://martek.herokuapp.com/api/admin/fetch-users",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data)
        setUsers(res.data);
        setCopyUsers(res.data)
        setIsActive(false)
    })
    .catch(error=>{
      console.log(error.response.data)
    });

  },[])

  //search
  function search(searchValue){
    let newSearchValue = searchValue.toLowerCase();
    let tempProducts = [...copyUsers];

    const search = _.filter(tempProducts, (item)=>{
        return searchQuery(item, newSearchValue)
    });
    
    setUsers(search)
    
}

function searchQuery(item,newSearchValue){
    const{name,email} = item;
    const {campus} = item.campus

    if((name.toLowerCase().includes(newSearchValue)) || (name.toUpperCase().includes(newSearchValue)) || (email.toLowerCase().includes(newSearchValue)) || (email.toUpperCase().includes(newSearchValue)|| (campus.toLowerCase().includes(newSearchValue)) || (campus.toUpperCase().includes(newSearchValue)))){
        return true;
    }
    return false;
}

function handleDeleteUser(){ 
  let tempUsers = users;
  console.log(deleteId)
  setOpen(false)
  axios.delete("http://martek.herokuapp.com/api/admin/user/"+deleteId+"/delete-account",
  {headers:{"Authorization":`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    if(res.data.status === "user deleted"){
      let newUsers = tempUsers.filter(item=>item.id !== deleteId);
      setUsers(newUsers)
    }
  })
}

function handleBlockUser(id){
  let tempUsers = [...users];
  axios.post("http://martek.herokuapp.com/api/admin/block/"+id+"/user",null,
  {headers:{"Authorization":`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    if(res.data.status === "blocked"){
      let selected = tempUsers.find(item=>item.id === id);
     console.log(selected.isActive);
     selected.isActive = false;
      setUsers(tempUsers)
    }
  })
  .catch(error=>{
    console.log(error.response.data)
  })
}

function handleUnBlockUser(id){
  let tempUsers = [...users];
  axios.post("http://martek.herokuapp.com/api/admin/unblock/"+id+"/user",null,
  {headers:{"Authorization":`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    if(res.data.status === "unblocked"){
      let selected = tempUsers.find(item=>item.id === id);
      selected.isActive = true;
      setUsers(tempUsers)
    }
  })
  .catch(error=>{
    console.log(error.response.data)
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
              All users registered on Martek
            </h4>
            </GridItem>
            <GridItem  xs={6} sm={6} md={6} lg={6}>
            <Input
              placeholder="Search"
              type="search"
              style={{color:"white"}}

              onChange={(e)=>{search(e.target.value);console.log(e.target.value)}}
            />
            </GridItem>
          </GridContainer>
          </CardHeader>
          <CardBody>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">User Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">email</StyledTableCell>
                <StyledTableCell align="center">Phone</StyledTableCell>
                <StyledTableCell align="center"> Campus </StyledTableCell>
                <StyledTableCell align="center"> Created_at </StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
            {users.map(item=>(
            <StyledTableRow key={item.id}>
            <StyledTableCell align="center">{item.id}</StyledTableCell>
            <StyledTableCell align="center">{item.name}</StyledTableCell>
            <StyledTableCell align="center">{item.email}</StyledTableCell>
            <StyledTableCell align="center">{item.phone}</StyledTableCell>
            <StyledTableCell align="center">{item.campus.campus}</StyledTableCell>
            <StyledTableCell align="center">{item.campus.created_at}</StyledTableCell>
            <StyledTableCell align="center" className={classes.tableActions}>
        {/* <Tooltip
          id="tooltip-top"
          title="View User"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Edit"
            className={classes.tableActionButton}
          >
            <Visibility
              color="primary"
              className={
                classes.tableActionButtonIcon + " " + classes.edit
              }
            />
          </IconButton>
        </Tooltip> */}
        {item.isActive?
        <Tooltip
          id="tooltip-top-block"
          title="Block User"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
        
          <IconButton
            color="secondary"
            aria-label="Block"
            className={classes.tableActionButton}
            onClick={()=>handleBlockUser(item.id)}
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
          title="Unblock User"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
          >
          <IconButton
            color="success"
            aria-label="Unblock"
            className={classes.tableActionButton}
            onClick={()=>handleUnBlockUser(item.id)}
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
            onClick={()=>{setOpen(true); setId(item.id)}}
          >
            <Close
              className={
                classes.tableActionButtonIcon + " " + classes.close
              }
            />
          </IconButton>
        </Tooltip>
        <Modal 
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
             <div style={modalStyle} className={classes.paper}>
              <h5 id="simple-modal-title">Do you want to delete user?</h5>
              <Button color="danger" onClick={()=>handleDeleteUser()}>Yes</Button> <Button color="info" onClick={()=>setOpen(false)}>No</Button>
             </div>
        </Modal>
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
      </GridItem>
      }
    </GridContainer>
  );
}
