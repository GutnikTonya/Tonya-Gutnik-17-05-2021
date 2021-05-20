import React, { useState } from 'react';

import * as actionHelpers from '../../../helpers';
import './weekDayForcast.css';


function WeekDayForcast(props) {
const {Date,Day,Temperature}=props.dayForcastData;
const {Maximum,Minimum}=Temperature;
const dayName=actionHelpers.getDayName(Date);


    return (
      <div  className="day-forcast-wrap">
            <h6>{dayName}</h6>
            <img src={`../../assets/${Day.Icon}-s.png`}/>
            <p>{Minimum.Value}{Minimum.Unit} - {Maximum.Value}{Maximum.Unit}</p>
           
      </div>
    )
  }

  export default WeekDayForcast;