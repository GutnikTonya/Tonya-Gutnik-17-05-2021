import React, { useState } from 'react';

import FavotireItem from './FavoriteItem/favoriteItem';
import './favorites.css';
import * as actionHelpres from '../../helpers';

function Favorites(props) {

  let favoritesItems=actionHelpres.getFavorites();

    return (
      <div className="favorites-wrap">
      {favoritesItems && Object.keys(favoritesItems).length !== 0?
        Object.keys(favoritesItems).map((keyName, keyIndex)=>{
          return  <FavotireItem tabIndex="0" dataFavoriteItem={favoritesItems[keyName]}  id={keyName} key={keyName}/>
      })
      :<div className="empty-favorites-wrap">
          <h4> No Favorites Yet</h4>
          <img src={`../../assets/windy3.gif`}></img>
      </div>
      }
      </div>
    )
  }

  export default Favorites;