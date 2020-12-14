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
import axios from "axios";
import _ from "lodash";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from "@material-ui/core/Input";

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
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },

}));

let user = localStorage.getItem('access_token');

export default function Campus(props) {
  const classes = useStyles();

  const [campus, setCampus] = React.useState([]);
  const [isActive, setIsActive] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("")



  React.useEffect(()=>{ 
    setIsActive(true)
    axios.get("https://backend-api.martekgh.com/api/campuses",
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      setCampus(res.data);
      setIsActive(false)
    });
  },[])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveCampus=()=>{
    console.log(user)
    axios.post('https://backend-api.martekgh.com/api/admin/create/campus',
    {campus:name},
    {headers:{"Authorization":`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data)
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  }


  return (
    <>
    {!isActive?
    <GridContainer>
    <GridItem md={12} sm={12} xs={12} lg={12} xl={12}>
      <Button color="primary" onClick={()=>handleClickOpen()}> 
        Add Campus
      </Button>
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
          Campus
          </CardHeader>
          <CardBody>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Id</StyledTableCell>
                <StyledTableCell align="center">Campus</StyledTableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
            {campus.map(value=>(
            <StyledTableRow key={value.id}>
            <StyledTableCell align="center">{value.id}</StyledTableCell>
           <StyledTableCell align="center">{value.campus}</StyledTableCell>
          </StyledTableRow>
          ))}
            </TableBody>
          </Table>
        </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add Campus</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type Campus Name
          </DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Select</InputLabel>
              <Input type="text" value={name} onChange={e=>setName(e.target.value)}/>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveCampus} color="primary">
            save
          </Button>
          <Button onClick={handleClose} color="danger">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
      :
      <GridContainer>
      <GridItem md={6} style={{marginLeft:"auto",marginRight:"auto",fontWeight:"bold"}}>
        Please Wait <CircularProgress style={{width:"15px",height:"15px",marginLeft:"5px"}}/>
      </GridItem>
      </GridContainer>
    }
  </>
  );
}
