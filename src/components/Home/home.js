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
   const {cityID,cities,degrees,LocalizedName,cityIcon,cityDataLoaded,citiesfetchError,weatherText,weeklyForcastArr}=searchObj;


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
            //default city load
            props.fetchCities(defaultCity);
            if(cities && cities.length>0){
                const cityObj={
                    id:cities[0].Key,
                    LocalizedName:cities[0].LocalizedName
                } 
                props.updateCitySelect(cityObj);
            }
        }
    }
    if(cityID)
        setinFav(actionHelpers.checkIfInFavorites(cityID));
  },);

  

    return (
        <Container fluid="md">
            <Row>
                <Search/>
            </Row>
            
           {
            <Row id={cityID} className="my-3">
            <Card className="px-0">
            <Card.Header>
                <Container>
                    <Row className="home-res-header">
                        <Col xs="4" md="6"  className=" chosen-city-wrap">
                            <Row>
                                <Col xs="auto" className="px-0"> <img src={`../../assets/${cityIcon}-s.png`}/></Col>
                                <Col className=" details">
                                    <p className="city-name">{LocalizedName}</p>
                                    <p className="city-deg">{degrees}</p>
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
                        { weeklyForcastArr && weeklyForcastArr.length>0 && weeklyForcastArr.map((dayForcastData,index) =><Col className=" mb-3"><WeekDayForcast key={index} dayForcastData={dayForcastData}/></Col>)}
                        </Row>
                    </Card.Text>
            </Card.Body>
            </Card>
            </Row>
        }
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
        
    }
    
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home);

