import { SET_CITY_ID,
    SET_CITY_DETAILS,
    FETCH_CITIES,
    FETCH_CITIES_ERROR,
    UPDATE_INPUT_VALUE,
    SET_WEEKLY_WEATHER,
    UPDATE_FAV_DATA,
    FETCH_CITY_ID_ERROR,
    UPDATE_TEMP_UNIT,
    SET_CITY_DETAILS_ERROR
 } from './actionsType';
import * as accuweatherdata from '../accuweatherConfig';



export const updateInputValue = (value) => {
    return {
        type: UPDATE_INPUT_VALUE,
        inputVal:value,
    };
};





export const fetchCities = (value) => {
    return dispatch => {
         fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${accuweatherdata.accuweather.apikey}&q=${value}`)
        .then((response) => response.json())
        .then((result) => {
          let arrCities=[]; 
          result.forEach(city => {
            arrCities.push({LocalizedName:city.LocalizedName,Key:city.Key,AdministrativeArea:city.AdministrativeArea.LocalizedName,Country:city.Country.LocalizedName});
          });
          if(arrCities.length>0){
            dispatch({
                type: FETCH_CITIES,
                cities: arrCities,
                citiesfetch:true,
                
              })
          }else{
            dispatch({
                type: FETCH_CITIES_ERROR,
                citiesfetch:true,
                cities:[]
              })
          }
         
        
        }).catch(function(err) {
            dispatch({
                type: FETCH_CITIES_ERROR,
                citiesfetch: false,
                cities:[],
                citiesfetchError:true,
              })
        });
        
    }
};









export const fetchGeopositionCityDetails = (value) => {
    return dispatch => {
         fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuweatherdata.accuweather.apikey}&q=${value}`)
        .then((response) => response.json())
        .then((result) => {
            console.log('Tonya',JSON.stringify(result))
            dispatch({
                type: SET_CITY_ID,
                cityID: result.Key,
                LocalizedName:result.LocalizedName,
                inputVal:result.LocalizedName
              })
        
         
        
        }).catch(function(err) {
            dispatch({
                type: FETCH_CITY_ID_ERROR,
              })
        });
        
    }
};




export const udateTemparatureUnit=(unit)=>{
    return{
        type: UPDATE_TEMP_UNIT,
        unit:unit
    }
}




export const updateCitySelect = (cityObj) => {
    return {
        type: SET_CITY_ID,
        cityID: cityObj.id,
        LocalizedName:cityObj.LocalizedName,
        inputVal:cityObj.LocalizedName
    };
};




export const setFavoriteParams = (cityObj) => {
    return {
        type: UPDATE_FAV_DATA,
        cityID: cityObj.cityID,
        LocalizedName:cityObj.LocalizedName,
        inputVal:cityObj.LocalizedName
     
    };
};


export const fetchCiyDetails = (cityID) => {
     return dispatch => {
        fetch(`https://dataservice.accuweather.com/currentconditions/v1/${cityID}/?apikey=${accuweatherdata.accuweather.apikey}`)
        .then((response) => response.json())
        .then((result) => {
            dispatch({
                type: SET_CITY_DETAILS,
                CiyDetailsFetched:true,
                cityIcon:result[0].WeatherIcon,
                degreesObj:result[0].Temperature,
                weatherText:result[0].WeatherText
            })
    
        })
    };
  
}







export const fetchWeeklyWeather=(cityID)=>{

    return dispatch => {
        fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityID}?apikey=${accuweatherdata.accuweather.apikey}&metric=true`)
        .then((response) => response.json())
        .then((result) => {
            dispatch({
                type: SET_WEEKLY_WEATHER,
                weeklyForcastArr: result.DailyForecasts
 
            })
    
        })
    };

}




