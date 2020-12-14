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
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

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
  const [isActive, setIsActive] = React.useState(true);
  const [campuses, setCampuses] = React.useState([])
  const [images, setImages] = React.useState([])
  const [id, setId] = React.useState(1)

  React.useEffect(()=>{
      setIsActive(true)
    axios.get("https://backend-api.martekgh.com/api/admin/campus/1/carousel-images",
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
    axios.get("https://backend-api.martekgh.com/api/campuses")
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
axios.get(`https://backend-api.martekgh.com/api/admin/campus/${id}/carousel-images`,
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

  const handelDelete=(id)=>{
    let tempImages = images;
    axios.delete(`https://backend-api.martekgh.com/api/admin/campus-carousel/${id}/delete`,
    {headers:{
      "Authorization":`Bearer ${user}`
  }})
    .then(res=>{
      console.log(res.data);
      let newImages = tempImages.filter(item=>item.id !== id);
      setImages(newImages)
    })
    .catch(error=>{
      console.log(error)
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
          <Card className={classes.root}>
            <CardHeader>
            <GridContainer>
              <GridItem>

              </GridItem>
              <GridItem md={3}>
            <Tooltip
              id="tooltip-top-start"
              title="Delete Image"
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
                  onClick={()=>handelDelete(value.id)}
                />
              </IconButton>
              
            </Tooltip>
              </GridItem>
            </GridContainer>
            </CardHeader>
          <div className='video-preview'>
          <div className='image-container' style={{textAlign:"center"}}>
            <img src={require("assets/img/sidebar-2.jpg")} style={{height:"230px", width:"auto"}}/>
          </div>
        </div>
         </Card>
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
