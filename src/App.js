import React from "react";
//import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';


import Home from "./components/Home/home";
import Favorites from "./components/Favorites/favorites";
import Header from './components/Header/header'
import './App.css';


function App() {
  return (
    <div className="App">
   <Router>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact  component={Home} />
        <Route path="/favorites" exact  component={Favorites} />
      </Switch>
    </Router>
  
    </div>
  );
}

export default App;
