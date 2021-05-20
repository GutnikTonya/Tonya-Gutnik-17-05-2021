import { SET_CITY_ID,SET_CITY_DETAILS,FETCH_CITIES,FETCH_CITIES_ERROR,UPDATE_INPUT_VALUE,SET_WEEKLY_WEATHER,UPDATE_FAV_DATA } from './actionsType';
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







export const updateCitySelect = (cityObj) => {
    return {
        type: SET_CITY_ID,
        cityID: cityObj.id,
        LocalizedName:cityObj.LocalizedName,
        inputVal:cityObj.LocalizedName
    };
};




export const updateFavorites = (cityObj) => {
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
                degrees:result[0].Temperature.Metric.Value,
                weatherText:result[0].WeatherText
            })
    
        })
    };
  
}




export const fetchCityWeather = (value) => {

    return dispatch => {
         fetch(`https://dataservice.accuweather.com/currentconditions/v1/${value}/?apikey=${accuweatherdata.accuweather.apikey}`)
        .then((response) => response.json())
        .then((result) => {
          let arrCities=[]; 
          result.forEach(city => {
            arrCities.push(city.LocalizedName);
          });
          if(arrCities.length>0){
            dispatch({
                type: FETCH_CITIES,
                cities: arrCities
              })
          }
         
        
        }).catch(function(err) {
            dispatch({
           
              })
        });
        
    }
};




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




