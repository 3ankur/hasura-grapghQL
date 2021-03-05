import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Burger from "./burger";

const Nav =styled.div`
width: 100%;
height: 55px;
border-bottom: 2px solid #f1f1f1;
padding: 0 20px;
display: flex;
justify-content: space-between;
.logo {
  padding: 15px 5px;
  border: 1px dotted #f1f1f1;
}
`;

const NavBar = ()=>{
    return(
        <Nav>
            <div role="banner" className="logo">
               <Link to="/">Ecommerce App</Link> 
            </div>
            <Burger/>
        </Nav>   
    )
}
export default NavBar;