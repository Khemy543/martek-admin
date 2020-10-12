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


export default function ProductDetails(props) {
    const [detaisl,setDetails] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [value, setValue] = React.useState('one');
    const [average, setAverage] = React.useState(0)
    const [expanded, setExpanded] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);
    const [images, setImages] = React.useState([]);
    const [owner, setOwner] = React.useState([])
    const [campus, setCampus]= React.useState([])

   

  React.useEffect(()=>{
      setIsActive(true)
    axios.get("https://martek.herokuapp.com/api/product/"+props.location.state.id+"/details")
    .then(res=>{
        console.log(res.data);
        setDetails(res.data);
        setIsActive(false);
        setImages(res.data.product_images);
        setOwner(res.data.product_owner);
        setCampus(res.data.product_owner.campus)
    });

    axios.get("https://martek.herokuapp.com/api/product/"+props.location.state.id+"/reviews")
    .then(res=>{
        console.log(res.data);
        setReviews(res.data.product_reviews);
        if(res.data.average_rating !== null){
        setAverage(res.data.average_rating);
        }
    })
    .catch(error=>{
        console.log(error)
    });
    
  },[])
  
  function handleReviewDelete(id){
    let tempReviews = reviews;
    axios.delete("https://martek.herokuapp.com/api/admin/product-review/"+id+"/delete",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        if(res.data.status === "deleted"){
          let newRatings = tempReviews.filter(item=>item.id !== id)
          setReviews(newRatings)
        }
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
  const {product_name,description, in_stock, price}=detaisl;
  return (
    <div>
      <GridContainer>
      {!isActive?
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{product_name}</h4>
              <p className={classes.cardCategoryWhite}>{description}</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                  <GridItem md={6} style={{fontSize:"11px"}}>
                    <h4 style={{fontWeight:"bold"}}>In Stock : {in_stock}</h4>
                    <h4 style={{fontWeight:"bold"}}>Price : GH¢ {price}</h4>
                    <h4 style={{fontWeight:"bold"}}>Average : {average}</h4>
                  </GridItem>
                  <GridItem md={6} style={{fontSize:"11px",textAlign:"right"}}>
                    <h4 style={{fontWeight:"bold"}}>{owner.name}</h4>
                    <h4 style={{fontWeight:"bold"}}>{owner.email}</h4>
                    <h4 style={{fontWeight:"bold"}}>{owner.phone}</h4>
                    <h4 style={{fontWeight:"bold"}}>{campus.campus}</h4>
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
                        <Tab label="Products Images" value='one' {...a11yProps('one')}/>
                        <Tab label="Reviews" value='two' {...a11yProps('two')}/>
                        </Tabs>
                    </GridItem>
                    <GridItem md={12}>
                    <TabPanel value={value} index="one">
                    <GridContainer>
                        <GridItem md={12}>
                          <GridContainer>
                          {images.map(value=>(
                            <GridItem md={4}>
                                <img src={require("assets/img/sidebar-1.jpg")} style={{height:"auto", width:"140px" }}/>
                            </GridItem>
                            ))}
                          </GridContainer>
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
                                    <StyledTableCell align="center">{value.date}, {value.time}</StyledTableCell>
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
        </GridItem>:
        <GridItem md={6} style={{marginLeft:"auto",marginRight:"auto",fontWeight:"bold"}}>
     Please Wait <CircularProgress style={{width:"15px",height:"15px",marginLeft:"5px"}}/>
      </GridItem>}
      </GridContainer>
    </div>
  );
}
