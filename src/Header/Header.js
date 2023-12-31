import orgLogo from "../Assets/orgLogo.png"
import  "./Header.css"
import { useState } from "react";
import {  Link, useLocation } from 'react-router-dom';
import SideBar from '../SideBarMenu/SideBarMenuButton';
import SideBarMenu from "../SideBarMenu/SideBarMenu";
export default function Header ({User,setSignUp,setLogIn,setSavedData}){
    let location = useLocation();
    let [sideBar,setSideBar] = useState(true)
    let root2 = document.body;
    let loginButtonStyle = {
        backgroundColor:"transparent",
        textDecoration:"underline",
        width:'1px',
        fontSize:'14px',
        
    }
    return (
        <div className="header-container">
            <Link onClick={() =>{
                window.scrollTo({top: 0, behavior:"smooth"})
            }} to="/"><img alt="" src={orgLogo} ></img></Link>

            <div className="header-middle_container">
            { location.pathname === "/terms" || location.pathname ==="/privacy" ? " " :
            User === "" ? 
            <div id="header-middle" className="header-container_middle">
                <p>Clean up with #Teamarm and track our progress</p>
                <button style={{marginBottom:"20px"}} onClick={() =>{
                    setSignUp(false)
                    root2.style.overflowY = "hidden";
                }}>Sign Up</button>
                
                 <div style={{fontSize:'12px', marginTop:'-20px'}}>Already have an account?
                    <button style={loginButtonStyle} onClick={() =>{
                        setLogIn(true);
                        root2.style.overflowY = "hidden";
                    }}>LogIn</button></div>
            </div> :
            <div className="header-loggedIn_container">
                <p>Clean up with #Teamarm and track our progress</p>
                <div>
                    <div>Welcome {User[0].toUpperCase() + User.slice(1,User.length)}</div>
                    <Link to="/" onClick={() => {
                        setSavedData("");
                        localStorage.setItem("name","")
                    }}>Logout</Link>
                </div>
            </div>
            }
            </div>
            
            {sideBar === true ? <SideBar setBar={setSideBar}/> : <SideBarMenu setBar={setSideBar}/> }
             
        </div>
    )
} 