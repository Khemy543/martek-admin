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
import TablePagination from '@material-ui/core/TablePagination';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import _ from "lodash";
import CircularProgress from '@material-ui/core/CircularProgress';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from "components/CustomButtons/Button.js";

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

export default function Shops(props) {
  const classes = useStyles();

  const [shops, setShops] = React.useState([]);
  const [shopCopy, setShopCopy] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false)
  const [blocked,setBlock]=React.useState(false)
  const [modalStyle] = React.useState(getModalStyle);
  const [deletId, setDeleteId] = React.useState(0)



  React.useEffect(()=>{
    setIsActive(true)
    axios.get("http://martek.herokuapp.com/api/admin/fetch-shops",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log("test:", res.data);
      setShops(res.data);
      setShopCopy(res.data)
      setIsActive(false)
    });
  },[])


  function handleDeleteShop(){
    let tempShop = shops;
    setOpen(false)
    axios.delete("https://martek.herokuapp.com/api/admin/shop/"+deletId+"/delete",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      if(res.data.status === "shop deleted"){
        let newShops = tempShop.filter(item=>item.id !== deletId);
         setShops(newShops)
      }
    })
  }

   //search
   function search(searchValue){
    let newSearchValue = searchValue.toLowerCase();
    let tempCopy = [...shopCopy]

    const search = _.filter(tempCopy, (item)=>{
        return searchQuery(item, newSearchValue)
    });
    
    setShops(search)
    
}

function searchQuery(item,newSearchValue){
    const{company_name} = item;
    const {campus} = item.campus

    if((company_name.toLowerCase().includes(newSearchValue)) || (company_name.toUpperCase().includes(newSearchValue)) || (campus.toLowerCase().includes(newSearchValue)) || (campus.toUpperCase().includes(newSearchValue))){
        return true;
    }
    return false;
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
              onChange={(e)=>search(e.target.value)}
            />
            </GridItem>
          </GridContainer>
          </CardHeader>
          <CardBody>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Shop Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Campus</StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
                <StyledTableCell align="center">Updated At </StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
            {shops.map(shop=>(
            <StyledTableRow key={shop.id}>
            <StyledTableCell align="center">{shop.id}</StyledTableCell>
            <StyledTableCell align="center">{shop.company_name}</StyledTableCell>
            <StyledTableCell align="center">{shop.campus.campus}</StyledTableCell>
            <StyledTableCell align="center">{shop.campus.created_at}</StyledTableCell>
            <StyledTableCell align="center">{shop.campus.updated_at}</StyledTableCell>
            <StyledTableCell align="center" className={classes.tableActions}>
        <Tooltip
          id="tooltip-top"
          title="View Shop"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Edit"
            className={classes.tableActionButton}
            onClick = {()=>{props.history.push("/admin/shop-details",{id:shop.id})}}
          >
            <Visibility
              color="primary"
              className={
                classes.tableActionButtonIcon + " " + classes.edit
              }
            />
          </IconButton>
        </Tooltip>
        {!blocked?
        <Tooltip
          id="tooltip-top-block"
          title="Block Shop"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
        
          <IconButton
            color="secondary"
            aria-label="Block"
            className={classes.tableActionButton}
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
          title="Unblock Shop"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
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
          title="Delete Shop"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            color="secondary"
            aria-label="Close"
            className={classes.tableActionButton}
            onClick={()=>{setOpen(true);setDeleteId(shop.id)}}
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
              <h5 id="simple-modal-title">Do you want to delete shop?</h5>
              <Button color="danger" onClick={()=>handleDeleteShop()}>Yes</Button> <Button color="info" onClick={()=>setOpen(false)}>No</Button>
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
      </GridItem>}
    </GridContainer>
  );
}
