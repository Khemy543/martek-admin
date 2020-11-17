import React from "react";
// @material-ui/core components
import { makeStyles,withStyles } from "@material-ui/core/styles";
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
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import avatar from "assets/img/faces/marc.jpg";
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Visibility from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';

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


export default function ShopDetails(props) {
    const [detaisl,setDetails] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [value, setValue] = React.useState('one');
    const [average, setAverage] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [deletId, setDeleteId] = React.useState(0);
    const [open, setOpen] = React.useState(false);


  React.useEffect(()=>{
    setIsActive(true)
    axios.get("https://martek.herokuapp.com/api/admin/get-shop/"+props.location.state.id+"/details",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        setDetails(res.data);
        setIsActive(false)
    });

    axios.get("https://martek.herokuapp.com/api/shop/"+props.location.state.id+"/reviews")
    .then(res=>{
        console.log(res.data);
        setReviews(res.data.product_reviews);
        setAverage(res.data.average_rating)
    })
    .catch(error=>{
        console.log(error.response.data)
    });

    axios.get("https://martek.herokuapp.com/api/merchandiser/"+props.location.state.id+"/products")
    .then(res=>{
        console.log(res.data);
        setProducts(res.data[0])
    })
    
  },[]);

  function handleReviewDelete(id){
    setOpen(false)
    let tempProducts =products;
      axios.delete("https://martek.herokuapp.com/api/admin/shop-review/"+id+"/delete",
      {headers:{"Authorization":`Bearer ${user}`}})
      .then(res=>{
         let tempReviews = [...reviews];
         let newReviews = tempProducts.filter(item=>item.id != id);
         setReviews(newReviews)
      })
  }

  function handleDeleteProduct(id){
    axios.delete("https://martek.herokuapp.com/api/admin/product/"+deletId+"/delete",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        let tempProducts = [...products]
        let newProducts = tempProducts.filter(item=>item.id != deletId);
        setProducts(newProducts);
        setOpen(false);
    })
}

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  

  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  const {company_name,company_description, email, phone, shop_type, no_followers, campus,avatar, cover_photo}=detaisl;
  return (
    <div>
      <GridContainer>
      {!isActive?
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{company_name}</h4>
              <p className={classes.cardCategoryWhite}>{company_description}</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem md={12}>
                  <img src={require("assets/img/cover.jpeg")} alt="#" 
                  style={{width:"100%",height:"40vh"}}/>
                  <div style={{display:"flex"}}>
                  <Avatar alt="Remy Sharp" src={require("assets/img/new_logo.png")}
                      style={{width:"70px",height:"70px", left: "45%",marginTop:"-80px"}}
                  />
                  </div>
              </GridItem>
              </GridContainer>
                <GridContainer>
                  <GridItem md={6} style={{textAlign:"center", fontSize:"12px"}} className="shop_data">
                    <h4 style={{fontWeight:"bold"}}>{email}</h4>
                    <h4 style={{fontWeight:"bold"}}>{phone}</h4>
                    <h4 style={{fontWeight:"bold"}}> {shop_type}</h4>
                  </GridItem>
                  <GridItem md={6} style={{textAlign:"center",fontSize:"12px"}} className="shop_data">
                    <h4 style={{fontWeight:"bold"}}>{campus}</h4>
                    <h4 style={{fontWeight:"bold"}}><span>No of Followers:</span> {no_followers}</h4>
                    <h4 style={{fontWeight:"bold"}}><span>Average Ratings:</span> {average}</h4>
                  </GridItem>
                </GridContainer>
                
               <GridContainer style={{marginTop:"20px"}}>
                    <GridItem md={5} style={{marginLeft:"auto", marginRight:"auto"}}>
                        <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                        >
                        <Tab label="Products" value='one' {...a11yProps('one')}/>
                        <Tab label="Reviews" value='two' {...a11yProps('two')}/>
                        </Tabs>
                    </GridItem>
                    <GridItem md={12}>
                    <TabPanel value={value} index="one">
                    <GridContainer>
              
                        <GridItem md={12}>
                        <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell align="center"> Id</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Price</StyledTableCell>
                                <StyledTableCell align="center">In_stock</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {products.map(item=>(
                            <StyledTableRow key={item.id}>
                                    <StyledTableCell align="center">{item.id}</StyledTableCell>
                                    <StyledTableCell align="center">{item.product_name}</StyledTableCell>
                                    <StyledTableCell align="center">{item.price}</StyledTableCell>
                                    <StyledTableCell align="center">{item.in_stock}</StyledTableCell>
                                    <StyledTableCell align="center" className={classes.tableActions}>
                                <Tooltip
                                id="tooltip-top"
                                title="View Product"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                                >
                                <IconButton
                                    aria-label="Edit"
                                    className={classes.tableActionButton}
                                    onClick = {()=>{props.history.push("/admin/product-details",{id:item.id})}}
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
                                    onClick={()=>{setOpen(true); setDeleteId(item.id)}}
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
                        ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        </GridItem>
                    </GridContainer>
                    
                    </TabPanel>
                    <TabPanel value={value} index="two">
                    <GridContainer>
                    <GridItem md={12}>
                        <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell align="center"> Id</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">message</StyledTableCell>
                                <StyledTableCell align="center">Rate</StyledTableCell>
                                <StyledTableCell align="center">time</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {reviews.map(value=>(
                            <StyledTableRow key={value.id}>
                                    <StyledTableCell align="center">{value.id}</StyledTableCell>
                                    <StyledTableCell align="center">{value.user.name}</StyledTableCell>
                                    <StyledTableCell align="center">{value.review}</StyledTableCell>
                                    <StyledTableCell align="center">{value.rating}</StyledTableCell>
                                    <StyledTableCell align="center">{value.time}</StyledTableCell>
                                    <StyledTableCell align="center" className={classes.tableActions}>
                                
                                <Tooltip
                                id="tooltip-top-start"
                                title="Delete Review"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                                >
                                <IconButton
                                    color="secondary"
                                    aria-label="Close"
                                    className={classes.tableActionButton}
                                    onClick={()=>handleReviewDelete(value.id)}
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
                        </GridItem>
                </GridContainer>
                    </TabPanel>
                    </GridItem>
                </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        :
        <GridItem md={6} style={{marginLeft:"auto",marginRight:"auto",fontWeight:"bold"}}>
     Please Wait <CircularProgress style={{width:"15px",height:"15px",marginLeft:"5px"}}/>
      </GridItem>}
      </GridContainer>
    </div>
  );
}
