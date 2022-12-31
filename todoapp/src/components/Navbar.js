import React, { useState } from 'react'
import logo1 from  './Images/logo1.jpeg'

import './Navbar.css'

import { Link } from 'react-router-dom'
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
function Navbar() 
{
    const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("navbar");
    }
   
    return (
        <div className='Navbar'>
            <Link to="#"><img src={logo1} alt="" className='rounded-5 m-0' ></img></Link>
			<nav ref={navRef} className="m-2">
				<Link to="/">Add Task</Link>
				<Link to="/tasklist">Task List</Link>
				<Link to="/todohistory">History</Link>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</div>
       
    )
}
       
export default Navbar
