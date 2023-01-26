import React, { useContext, useState } from 'react'
import "./navBar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


const NavBar = () => {

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const {logout} = useContext(AuthContext);
  const [err,setErr] = useState('')

  const Navigate = useNavigate();

  const handleLogout = async () =>{
    try{
    await logout();
    Navigate("/login")
    }catch(err){
      setErr(err)
    }
  }
  return (
    <div className='navBar'>
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
        <span>SimpleSocial</span>
        </Link>
        <HomeOutlinedIcon/>
        { darkMode ? <WbSunnyOutlinedIcon onClick={toggle}/> : <DarkModeOutlinedIcon onClick={toggle}/>}
        <GridViewOutlinedIcon/>
        <div className="search">
          <SearchOutlinedIcon/>
          <input type="text" placeholder='Cerca qualcosa...'></input>
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon/>
        <EmailOutlinedIcon/>
        <NotificationsOutlinedIcon/>
        <div className="user">
         <img src={currentUser.profilePic} alt='propic'/>
          <span>{currentUser.name}</span>
          {<LogoutOutlinedIcon style={{cursor:"pointer"}} onClick={handleLogout} />}
        </div>
      </div>
    </div>
  )
}

export default NavBar
