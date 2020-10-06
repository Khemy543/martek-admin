import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Carousel from 'react-material-ui-carousel';
import Button from "components/CustomButtons/Button.js";

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
  
 

const useStyles = makeStyles(styles);
let user = localStorage.getItem("access_token")


export default function Ads(props) {
    
  const classes = useStyles();
  const [isActive, setIsActive] = React.useState(false);
  const [campuses, setCampuses] = React.useState([])
  const [images, setImages] = React.useState([])
  const [id, setId] = React.useState(1)

  React.useEffect(()=>{
      setIsActive(true)
    axios.get("https://martek.herokuapp.com/api/admin/campus/1/carousel-images",
    {headers:{
      "Authorization":`Bearer ${user}`
  }})
    .then(res=>{
        console.log(res.data);
        setImages(res.data)
        setIsActive(false)
    })
    .catch(error=>{
      console.log(error.response.data)
    })

    //campus
    axios.get("https://martek.herokuapp.com/api/campuses")
    .then(res=>{
        console.log(res.data);
        setCampuses(res.data)
    })
    .catch(error=>{
        console.log(error.response.data)
    })

},[])

var items = [images]

//fetch
const FetchImages=(id)=>{
setId(id)
axios.get(`https://martek.herokuapp.com/api/admin/campus/${id}/carousel-images`,
    {headers:{
      "Authorization":`Bearer ${user}`
  }})
    .then(res=>{
        console.log(res.data);
        setImages(res.data)
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  }

  return (
    <GridContainer>
    {!isActive?
      <GridItem xs={12} sm={12} md={12}>
      <Card>
      <CardHeader color="primary">
      <GridContainer>
      <GridItem md={6}>
      <h4 className={classes.cardTitleWhite}>Manage Ads</h4>
      </GridItem>
      <GridItem md={6}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={id}
            onChange={e => FetchImages(e.target.value)}
            >
                {campuses.map(value => <MenuItem value={value.id} key={value.id}>{value.campus}</MenuItem>)}
            </Select>
      </GridItem>
     
      </GridContainer>
      </CardHeader>
      <CardBody>
        <GridContainer>
        {images.map(value=>(
        <GridItem md={4}>
          <div className='video-preview'>
        <div className='image-container'>
          <img src={require("assets/img/sidebar-2.jpg")} className="image"/>
        </div>
      </div>
         </GridItem>
        ))}
        </GridContainer>
        <br/>
        <Button
        color="primary"
        onClick={()=>props.history.push("/admin/add-ads")}
        >
          Add Image
        </Button>
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
