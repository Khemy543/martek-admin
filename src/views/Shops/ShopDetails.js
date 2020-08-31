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
  },
  media: {
    height: '185.13px',
    width:'100px' // 16:9
  },
};

const useStyles = makeStyles(styles);
let user = localStorage.getItem('access_token');


export default function ShopDetails(props) {
    const [detaisl,setDetails] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [value, setValue] = React.useState('one');
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

  React.useEffect(()=>{
    axios.get("https://martek.herokuapp.com/api/admin/get-shop/"+props.location.state.id+"/details",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        setDetails(res.data)
    });

    axios.get("https://martek.herokuapp.com/api/shop/"+props.location.state.id+"/reviews")
    .then(res=>{
        console.log(res.data);
        setReviews(res.data)
    })
    .catch(error=>{
        console.log(error)
    });

    axios.get("https://martek.herokuapp.com/api/merchandiser/"+props.location.state.id+"/products")
    .then(res=>{
        console.log(res.data);
        setProducts(res.data[0])
    })
    
  },[])

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
                      style={{width:"70px",height:"70px"}}
                  />
                  </div>
                 
                  
              </GridItem>

                <GridItem md={6} style={{fontSize:"11px",fontWeight:"bold"}} className="shop_data">
                    <h4><span style={{fontWeight:"bold"}}>Email:</span> {email}</h4>
                    <h4><span style={{fontWeight:"bold"}}>Phone:</span> {phone}</h4>
                    <h4><span style={{fontWeight:"bold"}}>Shop Type:</span> {shop_type}</h4>
                    <h4><span style={{fontWeight:"bold"}}>Campus:</span> {campus}</h4>
                    <h4><span style={{fontWeight:"bold"}}>No of Followers:</span> {no_followers}</h4>
                </GridItem>
               
               </GridContainer>
               <GridContainer style={{marginTop:"20px"}}>
                    <GridItem md={4} style={{marginLeft:"auto", marginRight:"auto"}}>
                    <Paper square >
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
                    </Paper>
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
                                title="View Shop"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                                >
                                <IconButton
                                    aria-label="Edit"
                                    className={classes.tableActionButton}
                                    onClick = {()=>{props.history.push("/admin/shop-details",{id:item.id})}}
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
                                title="Delete Shop"
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
                        </GridItem>
                    </GridContainer>
                    
                    </TabPanel>
                    <TabPanel value={value} index="two">
                    <GridContainer>
                {reviews.map(value=>(
                    <GridItem md={6} style={{marginLeft:"auto", marginRight:"auto"}}>
                    <SnackbarContent message={"This is a plain notification"}>
                    <IconButton
                    color="secondary"
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={()=>{console.log(value.id)}}
                >
                    <Close
                    className={
                        classes.tableActionButtonIcon + " " + classes.close
                    }
                    />
                    </IconButton>
                    </SnackbarContent>
                    </GridItem>
                    ))}
                </GridContainer>
                    </TabPanel>
                    </GridItem>
                </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
