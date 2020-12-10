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
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';


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
 
export default function Products(props) {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  const [isActive, setIsActive] =React.useState(false)
  const [modalStyle] = React.useState(getModalStyle);
  const [deletId, setDeleteId] = React.useState(0)
  const [open, setOpen] = React.useState(false);


  React.useEffect(()=>{
    axios.get("http://backend-api.martekgh.com/api/category/"+props.location.state.id+"/products")
    .then(res=>{
        console.log(res.data);
    });

    getProducts();
  },[])


  function getProducts(page=1){
    setIsActive(true)
    console.log("page:",page)
    axios.get("http://backend-api.martekgh.com/api/category/"+props.location.state.id+"/products?page="+page+"")
    .then(res=>{
      console.log(res.data)
        setProducts(res.data);
        setIsActive(false)
    })
    .catch(error=>{
      console.log(error)
    });
}

function handleDeleteProduct(){
  setOpen(false)
    axios.delete("http://backend-api.martekgh.com/api/admin/product/"+deletId+"/delete",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data)
    })
}

function renderProducts(){
    const {data, meta} = products;
    console.log(data)
    return(
    <React.Fragment>
        {data && data[0].map(value=>{
        return(
        <StyledTableRow key={value.id}>
              <StyledTableCell align="center">{value.id}</StyledTableCell>
              <StyledTableCell align="center">{value.product_name}</StyledTableCell>
              <StyledTableCell align="center">{value.in_stock}</StyledTableCell>
              <StyledTableCell align="center">{value.price}</StyledTableCell>
              <StyledTableCell align="center" className={classes.tableActions}>
          <Tooltip
            id="tooltip-top"
            title="View Product"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
            onClick={()=>props.history.push("/admin/product-details",{id:value.id})}
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
          </Tooltip>
          <Tooltip
            id="tooltip-top-start"
            title="Delete Product"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              color="secondary"
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={()=>{setOpen(true); setDeleteId(value.id)}}
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
                  <h5 id="simple-modal-title">Do you want to delete product?</h5>
                  <Button color="danger" onClick={()=>handleDeleteProduct()}>Yes</Button> <Button color="info" onClick={()=>setOpen(false)}>No</Button>
                </div>
            </Modal>
        </StyledTableCell>
            </StyledTableRow>
        )})}
    {/* <GridContainer>
    <GridItem md={12}>
      <Pagination
        count={meta&&meta.lastpage}
        page={meta&&meta.current_page}
        onChange={(page)=>getProducts(page)}
        showFirstButton={true}
        showLastButton={true}
      />
    </GridItem>
    </GridContainer> */}
    </React.Fragment>
  )
  
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
                {props.location.state.name}
            </h4>
            </GridItem>
            <GridItem  xs={6} sm={6} md={6} lg={6}>
            <Input
              placeholder="Search"
              type="search"
              style={{color:"white"}}
            />
            </GridItem>
          </GridContainer>
          </CardHeader>
          <CardBody>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">In Stock</StyledTableCell>
                <StyledTableCell align="center">Price </StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
            {products && renderProducts()}
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
