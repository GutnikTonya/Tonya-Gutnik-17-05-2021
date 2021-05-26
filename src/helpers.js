import * as accuweatherdata from './accuweatherConfig';


export const getFavorites=()=>{
    return JSON.parse(localStorage.getItem('weatherFavorites'));

}

export const checkIfInFavorites=(id)=>{
    const weatherFavoritesOBJ =getFavorites();
    return weatherFavoritesOBJ && weatherFavoritesOBJ[id] != null;
}

export const addToFavorites=(dataObj)=>{
    const weatherFavoritesOBJ =getFavorites()
    const {cityID,LocalizedName,degrees,cityIcon,weatherText}=dataObj;
    let cityObj=!weatherFavoritesOBJ|| Object.keys(weatherFavoritesOBJ).length === 0?{}:{...weatherFavoritesOBJ};
   
    cityObj[cityID]={
        LocalizedName:LocalizedName,
        degrees:degrees,
        cityIcon:cityIcon,
        weatherText:weatherText
    }
        localStorage.setItem('weatherFavorites', JSON.stringify(cityObj))
}


export const removeFromFavorites=(dataObj)=>{
    const weatherFavoritesOBJ =getFavorites();
    if(weatherFavoritesOBJ && weatherFavoritesOBJ[dataObj.cityID]){
        const obweatherFavoritesLocal = { ...weatherFavoritesOBJ }
        delete obweatherFavoritesLocal[dataObj.cityID];      
        localStorage.setItem('weatherFavorites', JSON.stringify(obweatherFavoritesLocal));
    }
}

const weekDaysNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export const getDayName = (date) => {
    return weekDaysNames[(new Date(date)).getDay()];
}




export const getCityDetails = (cityID) => {
       return fetch(`https://dataservice.accuweather.com/currentconditions/v1/${cityID}/?apikey=${accuweatherdata.accuweather.apikey}`)
       .then((response) => response.json())
       .then((result) => {
          return{
               cityIcon:result[0].WeatherIcon,
               degreesObj:result[0].Temperature,
               weatherText:result[0].WeatherText
           }
           
       })
}