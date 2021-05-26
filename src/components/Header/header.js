import React,{useState} from "react";
import { NavLink } from 'react-router-dom'
import {Navbar,Nav,Container,Row,col,Form,InputGroup} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import './header.css';



const Headers=()=>{
    let [darkMode,setDarkMode]=useState(false);

    
const handleChangeChk=(e)=>{
    if(e.currentTarget.checked){
        document.body.setAttribute("data-theme", "dark");
        setDarkMode(true);
    }else{
        document.body.removeAttribute("data-theme");
        setDarkMode(false);
    }


}

return(
    <Container className=" px-md-3 px-0" fluid="md">
        
         <Navbar className="p-2"  expand="lg">
             
             <LinkContainer to="/home">
                 <h4>Weather App by Tonya</h4>
             </LinkContainer>
 
             <div className='screen-mode-wrap'>
                    <input onChange={(e)=>{handleChangeChk(e)}} type="checkbox" className="checkboxScreenMode" id="chk" />
                    <label className="label" htmlFor="chk">
                        <i className="fa fa-sun-o"></i>
                        <i className="fa fa-moon-o"></i>
                        <div className="ball"></div>
                    </label>
                </div>




         
                <Navbar >
                <Nav.Item> </Nav.Item>
                </Navbar>
                
             <Navbar.Toggle className={darkMode?"navbar-dark":"navbar-light"} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                <Nav activeKey={window.location.pathname} className="mr-auto">
                <Nav.Item><NavLink className="nav-link" exact to={"/home"}>Home</NavLink></Nav.Item>
                <Nav.Item><NavLink className="nav-link" exact to={"/favorites"}>Favorites</NavLink></Nav.Item>
                
                </Nav>
                
            </Navbar.Collapse>
      
        </Navbar>
</Container>

)


}

export default Headers;