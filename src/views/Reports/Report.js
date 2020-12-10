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
import Tabs from '@material-ui/core/Tabs';
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
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

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
  
 

const useStyles = makeStyles(styles);
let user = localStorage.getItem('access_token');

export default function Reports(props) {
    
  const classes = useStyles();
  const [shopReports, setShopReports] = React.useState([]);
  const [productReports, setProductReports] = React.useState([])
  const [isActive, setIsActive] = React.useState(false);
  const [value, setValue] = React.useState('one');

  React.useEffect(()=>{
      setIsActive(true)
    axios.get("http://backend-api.martekgh.com/api/admin/product-reports",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        setProductReports(res.data);
        setIsActive(false)
    })
    .catch(error=>{
      console.log(error.response.data)
    })

    axios.get("http://backend-api.martekgh.com/api/admin/shop-reports",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        setShopReports(res.data);
        setIsActive(false)
    }).catch(error=>{
      console.log(error.response.data)
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

  return (
    <GridContainer>
    {!isActive?
      <GridItem xs={12} sm={12} md={12}>
      <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>All Reports</h4>
      </CardHeader>
      <CardBody>
      <GridContainer style={{marginTop:"20px"}}>
                    <GridItem md={5} style={{marginLeft:"auto", marginRight:"auto"}}>
                        <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                        >
                        <Tab label="Shop Reports" value='one' {...a11yProps('one')}/>
                        <Tab label="Product Reports" value='two' {...a11yProps('two')}/>
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
                                <StyledTableCell align="center">Shop Id</StyledTableCell>
                                <StyledTableCell align="center">Shop Name</StyledTableCell>
                                <StyledTableCell align="center">Message</StyledTableCell>
                                <StyledTableCell align="center">Reporter</StyledTableCell>
                                <StyledTableCell align="center">Reporter Contact</StyledTableCell>
                            
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {shopReports.map(item=>(
                            <StyledTableRow key={item.id}>
                                    <StyledTableCell align="center">{item.shop.id}</StyledTableCell>
                                    <StyledTableCell align="center">{item.shop.shop_name}</StyledTableCell>
                                    <StyledTableCell align="center">{item.report}</StyledTableCell>
                                    <StyledTableCell align="center">{item.user.name}</StyledTableCell>
                                    <StyledTableCell align="center">{item.user.email}</StyledTableCell>
                                    {/* <StyledTableCell align="center" className={classes.tableActions}>
                                <Tooltip
                                id="tooltip-top"
                                title="View Shop"
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
                            </StyledTableCell> */}
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
                                <StyledTableCell align="center">Product Id</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Message</StyledTableCell>
                                <StyledTableCell align="center">Reporter</StyledTableCell>
                                <StyledTableCell align="center">Reporter Contact</StyledTableCell>
                            
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {productReports.map(value=>(
                            <StyledTableRow key={value.id}>
                                    <StyledTableCell align="center">{value.product.id}</StyledTableCell>
                                    <StyledTableCell align="center">{value.product.product_name}</StyledTableCell>
                                    <StyledTableCell align="center">{value.report}</StyledTableCell>
                                    <StyledTableCell align="center">{value.user.name}</StyledTableCell>
                                    <StyledTableCell align="center">{value.user.email}</StyledTableCell>
                                   {/*  <StyledTableCell align="center" className={classes.tableActions}>
                                
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
                                >
                                    <Close
                                    className={
                                        classes.tableActionButtonIcon + " " + classes.close
                                    }
                                    />
                                </IconButton>
                                
                                </Tooltip>
                            </StyledTableCell> */}
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
  );
}
