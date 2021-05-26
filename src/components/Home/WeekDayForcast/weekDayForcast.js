import React, { useState } from 'react';

import * as actionHelpers from '../../../helpers';
import './weekDayForcast.css';


function WeekDayForcast(props) {
const {Date,Day,Temperature}=props.dayForcastData;

const {Maximum,Minimum}=Temperature;
const dayName=actionHelpers.getDayName(Date);

let minimumVal=Minimum.Value;
let maximunVal=Maximum.Value;
let unit=Minimum.Unit;
if(props.tempUnit==="Imperial"){
  minimumVal = (Minimum.Value * 9 / 5 + 32).toFixed(1);
  maximunVal=(Minimum.Value * 9 / 5 + 32).toFixed(1);
  unit="F";
}

    return (
      <div  className="day-forcast-wrap">
            <p>{dayName}</p>
            <img src={`../../assets/${Day.Icon}-s.png`}/>
            <p>{minimumVal}{unit} - {maximunVal}{unit}</p>
           
      </div>
    )
  }

  export default WeekDayForcast;