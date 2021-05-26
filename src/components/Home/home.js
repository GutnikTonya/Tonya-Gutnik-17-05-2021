import React, { useState,useEffect  } from 'react';
import {connect} from 'react-redux';
 
import {Container,Row,Col,Card,Button} from "react-bootstrap";
import Search from "../Search/search";
import WeekDayForcast from "./WeekDayForcast/weekDayForcast";

import * as actionCreator from "../../actions/searchAction"
import * as actionHelpers from '../../helpers';

import './home.css';



function Home(props) {
   const [defaultCity,setDefaultCity]=useState('Tel Aviv');
   const [inFav,setinFav]=useState(false);
 

   const {searchObj}=props
   const {cityID,cities,degreesObj,LocalizedName,cityIcon,cityDataLoaded,citiesfetchError,weatherText,weeklyForcastArr,tempUnit}=searchObj;


 

    const updateCityToFavorites=(searchObj)=>{
        setinFav(inFavPrev=>!inFavPrev);
        !inFav?actionHelpers.addToFavorites(searchObj):actionHelpers.removeFromFavorites(searchObj);
    }
    
    //first load default city data
   useEffect(() => {
    if(!cityDataLoaded && !citiesfetchError){ 
        if(cityID){
            setinFav(actionHelpers.checkIfInFavorites(cityID));
            props.fetchCiyDetails(cityID);
            props.fetchWeeklyWeather(cityID);
        }
        else{
            if(!navigator.geolocation || props.searchObj.errorFetchCityID) {
                setDefaultCityIfError();
            } else {
                navigator.geolocation.getCurrentPosition(success, error);
            }
        }
    }
    if(cityID)
        setinFav(actionHelpers.checkIfInFavorites(cityID));
  },);



    const success=(position)=> {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        const val=latitude+","+longitude;
       
        // Accuweather API Geoposition Search
        props.fetchGeopositionCityDetails(val)
    }

    const error=()=> {
        setDefaultCityIfError();
    }

    const setDefaultCityIfError = () =>
    {//default city load
        props.fetchCities(defaultCity);
        if(cities && cities.length>0){
            const cityObj={
                id:cities[0].Key,
                LocalizedName:cities[0].LocalizedName
            } 
            props.updateCitySelect(cityObj);
        }
        alert("Geolocation service malfunction. Default city set to Tel Aviv.")
    }

    const handleChangeTemUnit=(e)=>{
        e.currentTarget.id==="Metric"? props.udateTemparatureUnit('Imperial'): props.udateTemparatureUnit('Metric');
    }

    return (
        <Container fluid="md">
            <Row>
                <Search/>
            </Row>
            
           
            <Row id={cityID} className="my-3">
            <Card className="px-0">
            <Card.Header>
                <Container className='px-sm-3 px-0'>
                    <Row className="home-res-header">
                        <Col xs="4" md="6"  className=" chosen-city-wrap">
                            <Row>
                                <Col sm="auto" xs="12" className="px-0">{cityIcon?<img src={`../../assets/${cityIcon}-s.png`}/>:<img className="Error-Img" src={`../../assets/cloud-cross.png`}/>}</Col>
                                <Col sm="auto" xs="9" className=" details ">
                                    <p className="city-name">{LocalizedName}</p>
                                    <p className="city-deg">{degreesObj?degreesObj[tempUnit].Value:""}</p>
                                </Col>
                                <Col className="px-md-3 px-0" sm="auto" xs="3"> 
                                  <div className='degree-mode' id={tempUnit} onClick={(e)=>{handleChangeTemUnit(e)}} >
                                    <label   className="degreeModeLabel" htmlFor="deg">
                                        <span className="celsius">C</span><span className="fahrenheit ">F</span>
                                    </label>
                                </div>
                </Col>
                            </Row>
                        </Col>
                        <Col xs="8" md="6"  className="add-fav-wrap">
                            {inFav? 
                            <div onClick={()=>{updateCityToFavorites(searchObj)}}>
                             <i className="fa fa-heart"  aria-hidden="true"></i> 
                             <Button variant="danger"    size="sm">In favorites</Button>
                             </div>
                            : 
                            <div onClick={()=>{updateCityToFavorites(searchObj)}}>
                            <i className="fa fa-heart-o" aria-hidden="true"></i> 
                            <Button variant="outline-danger"   size="sm">Add to favorites</Button>
                            </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                <Card.Title><h3>{weatherText}</h3></Card.Title>
                    <Card.Text>
                        <Row>
                        { weeklyForcastArr && weeklyForcastArr.length>0 ? weeklyForcastArr.map((dayForcastData,index) =><Col  key={index} className=" mb-3"><WeekDayForcast tempUnit={tempUnit} dayForcastData={dayForcastData}/></Col>):
                                      <div className="Forcast-Error">
                                      <img  src={`../../assets/forcast.svg`}></img>
                                      <h5>No weekly forecast available</h5>
                                      <h6>Please try again</h6>
                                 
                                  </div> 
                        }
          
                        </Row>
                    </Card.Text>
            </Card.Body>
            </Card>
            </Row>
        
        </Container>

    );
  }

  const mapStateToProps = state=> {
    return {
      searchObj:state.search,

    }
  }


  const mapDispatchToProps = dispatch=> {
    return{
        fetchCiyDetails:(id) => dispatch(actionCreator.fetchCiyDetails(id)),
        fetchCities:(val) => dispatch(actionCreator.fetchCities(val)),
        updateCitySelect:(id) => dispatch(actionCreator.updateCitySelect(id)),
        fetchWeeklyWeather:(id) => dispatch(actionCreator.fetchWeeklyWeather(id)),
        fetchGeopositionCityDetails:(val) => dispatch(actionCreator.fetchGeopositionCityDetails(val)),
        udateTemparatureUnit:(unit) => dispatch(actionCreator.udateTemparatureUnit(unit)),
        
        
    }
    
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home);

