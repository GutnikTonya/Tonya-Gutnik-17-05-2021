import React from "react";
import { NavLink } from 'react-router-dom'
import {Navbar,Nav,Container,Row,col} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'



const Headers=()=>{
return(
    <Container className=" px-md-3 px-0" fluid="md">
         <Navbar className="p-2" bg="light" expand="lg">
             <LinkContainer to="/home">
                <h4>Weather App by Tonya</h4>
             </LinkContainer>
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
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