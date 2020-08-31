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


export default function ProductDetails(props) {
    const [detaisl,setDetails] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [value, setValue] = React.useState('one');
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

  React.useEffect(()=>{
    axios.get("https://martek.herokuapp.com/api/product/"+props.location.state.id+"/details")
    .then(res=>{
        console.log(res.data);
        setDetails(res.data)
    });

    axios.get("https://martek.herokuapp.com/api/product/"+props.location.state.id+"/reviews")
    .then(res=>{
        console.log(res.data);
        setReviews(res.data)
    })
    .catch(error=>{
        console.log(error)
    });
    
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
  const {product_name,description, in_stock, price}=detaisl;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{product_name}</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                  <GridItem md={6} style={{fontSize:"11px"}}>
                    <h4><span style={{fontWeight:"bold"}}>Product Description :</span>{description}</h4>
                    <h4><span style={{fontWeight:"bold"}}>In Stock :</span>{in_stock}</h4>
                    <h4><span style={{fontWeight:"bold"}}>Price :</span>{price}</h4>
                  </GridItem>
              </GridContainer>
               <GridContainer style={{marginTop:"20px"}}>
                    <GridItem md={4} style={{marginLeft:"auto", marginRight:"auto"}}>
                    <Paper square >
                        <Tab label="Reviews" value='one' {...a11yProps('one')}/>
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
                                <StyledTableCell align="center">Message</StyledTableCell>
                                <StyledTableCell align="center">User</StyledTableCell>
                                <StyledTableCell align="center">User Email</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {reviews.map(item=>(
                            <StyledTableRow key={item.id}>
                                    <StyledTableCell align="center">{item.id}</StyledTableCell>
                                    <StyledTableCell align="center">{item.review}</StyledTableCell>
                                    <StyledTableCell align="center">{item.user.name}</StyledTableCell>
                                    <StyledTableCell align="center">{item.user.email}</StyledTableCell>
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
                    </GridItem>
                </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
