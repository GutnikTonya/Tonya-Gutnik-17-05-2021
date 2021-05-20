import React, { useState } from 'react';
import {Container,Row,Col,InputGroup,FormControl,Card,ListGroup,Modal,Button} from "react-bootstrap";
import {connect} from 'react-redux';


import * as actionCreator from "../../actions/searchAction"
import './search.css';
import * as accuweatherdata from '../../accuweatherConfig';


function Search(props) {
  const [showRes,setShowRes]=useState(false);
  let [results,setResults]=useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const SearchCity = (value) => {
    setShowRes(true);
    props.updateInputValue(value);
    props.fetchCities(value);
  };

  
  const selectCity=(e)=>{
    if(e.charCode === 13 || e.type==="click"){
      setShowRes(false);
      const cityObj={
        id:e.currentTarget.id,
        LocalizedName:e.currentTarget.textContent
      }

      props.updateCitySelect(cityObj);
      props.fetchCiyDetails(cityObj.id);
      props.fetchWeeklyWeather(cityObj.id);
    }

  }


  const onSelectTyping=(e)=>{
    if (e.charCode === 13 || e.type==="click") {
      setShowRes(false);
      let cityObj={};
      for (const city of props.cities) {
          if(city.LocalizedName.toUpperCase()===props.inputVal.toUpperCase()){
            cityObj= city;
          }
      }
      if(Object.keys(cityObj).length !== 0){
        props.updateCitySelect(cityObj);
      }

      else{
        setShowAlert(true);
      }
    }
  }


  return (
        <Container className="search">
          <Row className="mt-3">
            <Col lg="4" xs="1"></Col>
            <Col lg="4" xs="10">
            <InputGroup >
              <FormControl
                placeholder="Enter city"
                aria-label="city"
                aria-describedby="input text area"
                className="search-field-auto"
                value={props.CiyDetailsFetched && !showRes?"":props.inputVal}
                onChange={(e)=>{SearchCity(e.target.value)}}
                onKeyPress={(e)=>{onSelectTyping(e)}}
                placeholder={props.LocalizedName}
              />

            <InputGroup.Prepend>
              <InputGroup.Text className="p-0" > <Button className="searchBtn" onKeyPress={(e)=>{onSelectTyping(e)}}  onClick={(e)=>{onSelectTyping(e)}}>  <i   className="fa fa-search" aria-hidden="true"></i></Button></InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>


        {showRes&&props.cities.length>0&&
          <Card className="result-container">
              <Card.Body className="auto-wrap">
                  <ListGroup  variant="flush">  
                    {props.cities.map((city,index)=>{
                     return  <ListGroup.Item tabIndex="0" onClick={(e)=>{selectCity(e)}} onKeyPress={(e)=>{selectCity(e)}} className="autocom-city" id={city.Key} key={index}>{city.LocalizedName}, {city.AdministrativeArea}, {city.Country}</ListGroup.Item>
                })}
                  </ListGroup>
              </Card.Body>
            </Card >
          }
          </Col>
          <Col lg="4" xs="1">
          </Col>
      </Row>


      <Modal
        show={showAlert}
        onHide={() => setShowAlert(false)}
        dialogClassName="emptySearchRes"
        aria-labelledby="empty search result"

      >
        <Modal.Header  closeButton>
        </Modal.Header>
        <Modal.Body>
          <p><b>Oops!</b></p>
          <p>No results found, please try again.</p>
          <img classNam="noResulm" src={`../../assets/cloud-cry.gif`}></img>
        </Modal.Body>
      </Modal>
      </Container>



    );
  }

 

  const mapStateToProps = state=> {
    return {
      cityID:state.search.cityID, 
      cities:state.search.cities, 
      LocalizedName:state.search.LocalizedName,
      inputVal:state.search.inputVal,
      citiesfetch:state.search.citiesfetch,
      CiyDetailsFetched:state.search.CiyDetailsFetched
    }
  }


  const mapDispatchToProps = dispatch=> {
    return{
      updateCitySelect:(id) => dispatch(actionCreator.updateCitySelect(id)),
      fetchCiyDetails:(id) => dispatch(actionCreator.fetchCiyDetails(id)),
      fetchCities:(val) => dispatch(actionCreator.fetchCities(val)),
      updateInputValue:(val) => dispatch(actionCreator.updateInputValue(val)),
      fetchWeeklyWeather:(val) => dispatch(actionCreator.fetchWeeklyWeather(val)),
      
      

    }
    
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Search);