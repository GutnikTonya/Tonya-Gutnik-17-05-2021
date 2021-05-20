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
    props.updateFavorites(cityObj);
    history.push("/home");
  }
  

    return (
      <div  className="favorite-wrap" onClick={openFavInHome} >
            <h5>{props.dataFavoriteItem.LocalizedName}</h5>
            <p>{cityParams.degrees}C</p>
            <img src={`../../assets/${cityParams.cityIcon}-s.png`}></img>
            <p>{cityParams.weatherText}</p>
      
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
      updateFavorites:(cityObj) => dispatch(actionCreator.updateFavorites(cityObj)),
    }
    
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(FavoriteItem);

