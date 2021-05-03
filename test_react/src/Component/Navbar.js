
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
  } from "react-router-dom";
import { useState,useEffect } from 'react';
import './Navbar.css';

function Navbar(){
  const[click,setClick] =useState(false);
  // const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () =>setClick(false);

  // const showButton = () => {
  //   if (window.innerWidth <= 960) {
  //     setButton(false);
  //   } else {
  //     setButton(true);
  //   }
  // };

  // useEffect(() => {
  //   showButton();
  // }, []);

  // window.addEventListener('resize', showButton);

    return(
        <>
        
        <nav className='navbar'>
            <div className='navbar-container'>
            
                <NavLink to='/' className='navbar-logo' onClick={closeMobileMenu} >
                WATER TREATMENT SYSTEM<span class="material-icons md-48">opacity</span> 
                </NavLink>
               
                <div className='menu-icon' onClick={handleClick}>
              <span class="material-icons md-48">{click ? 'close' : 'menu' }</span>
                </div>
                <ul className = {click ? 'nav-menu active':'nav-menu'}>
                  <li className='nav-item'>
                    <NavLink to='/'className ='nav-NavLink' onClick={closeMobileMenu}>
                    <span class="material-icons md-48">home</span> 
                     Home
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/dashboard'className ='nav-NavLink' onClick={closeMobileMenu}>
                    <span class="material-icons md-48">insights</span> 
                      Dashboard
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/P-T' className ='nav-NavLink' onClick={closeMobileMenu}>
                    <span class="material-icons md-48">settings_power</span>  
                      Power-Temperature
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/report'className ='nav-NavLink' onClick={closeMobileMenu}>
                    <span class="material-icons md-48">description</span> 
                      Report
                    </NavLink>
                  </li>
                  
                  <li className='nav-item'>
                    <NavLink to='/login'className ='nav-NavLink' onClick={closeMobileMenu}>
                    <span class="material-icons md-48">account_circle</span> 
                      Login
                    </NavLink>
                  </li>
                </ul>
            </div>
            
        </nav>
       
    </>
    )
}
export default Navbar

