import React, { useState,useEffect  } from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import * as actionCreator from "../../../actions/searchAction";
import './favoriteItem.css';
import * as actionHelpers from '../../../helpers.js'

function FavoriteItem(props) {
  const [cityParams,updateCityParams]=useState('');
  const [path,setPath]=useState('favorites');
  const{ tempUnit}=props.searchObj;


  let history = useHistory();
  useEffect(async () => {
    const params = await actionHelpers.getCityDetails(props.id);
    updateCityParams(params)
  }, []);



  const openFavInHome=()=>{
    const cityObj={
      cityID:props.id,
      LocalizedName:props.dataFavoriteItem.LocalizedName
    }
    props.setFavoriteParams(cityObj);
    history.push("/home");
  }
  

    return (
      <div  className="favorite-wrap" onClick={openFavInHome} >
        <h5>{props.dataFavoriteItem.LocalizedName}</h5>
        {!cityParams?<img className="Error-Img" src={`../../assets/cloud-cross.png`}></img> :
        <div>
            <p>{cityParams.degreesObj?cityParams.degreesObj[tempUnit].Value:""} {cityParams.degreesObj?cityParams.degreesObj[tempUnit].Unit:""} </p>
            <img src={`../../assets/${cityParams.cityIcon}-s.png`}></img>
            <p>{cityParams.weatherText}</p>
            </div>
          }
      </div>
    )
  }



  const mapStateToProps = state=> {
    return {
      searchObj:state.search,

    }
  }


  const mapDispatchToProps = dispatch=> {
    return{
      setFavoriteParams:(cityObj) => dispatch(actionCreator.setFavoriteParams(cityObj)),
    }
    
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(FavoriteItem);

