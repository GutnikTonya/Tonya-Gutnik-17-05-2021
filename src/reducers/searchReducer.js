import { SET_CITY_ID,SET_CITY_DETAILS,FETCH_CITIES,FETCH_CITIES_ERROR,UPDATE_INPUT_VALUE,SET_WEEKLY_WEATHER,UPDATE_FAV_DATA} from '../actions/actionsType';

const initialState = {
  cities:[],
  cityID:'',
  LocalizedName:"",
  cityDataLoaded:false,
  citiesfetch:false,
  citiesfetchError:false,
  weeklyForcastArr:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
   
    case FETCH_CITIES:
      return {
        ...state,
        cities: action.cities,
        citiesfetch: action.citiesfetch,
        citiesfetch:action.citiesfetchError
      };

      case FETCH_CITIES_ERROR:
        return {
          ...state,
          citiesfetch: action.citiesfetch,
          cities: action.cities,
          citiesfetchError:action.citiesfetchError
         
        };   

        case UPDATE_INPUT_VALUE:
          return {
            ...state,
            inputVal:action.inputVal,
          };  


    case SET_CITY_ID:
      return {
        ...state,
        cityID: action.cityID,
        LocalizedName:action.LocalizedName,
        inputVal:action.inputVal
      };

      case SET_CITY_DETAILS:
        return {
          ...state,
          CiyDetailsFetched:action.CiyDetailsFetched,
          cityIcon:action.cityIcon,
          degrees:action.degrees,
          weatherText:action.weatherText,
          cityDataLoaded:true
        };


        case SET_WEEKLY_WEATHER:
          return {
            ...state,
            weeklyForcastArr:action.weeklyForcastArr
         
          };

          case  UPDATE_FAV_DATA:
            return {
              ...state,
              cityID: action.cityID,
              LocalizedName:action.LocalizedName,
              inputVal:action.inputVal,
              cityDataLoaded:false
           
            };
         
  
    default:
      return state;
  }
}