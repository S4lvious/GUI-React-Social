import React from 'react'
import "./login.scss"
import { Link, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from "react-router-dom";


const Login = () => {


  const Navigate = useNavigate();

  const {login} = useContext(AuthContext);
  const handleLogin = () =>{
    
    login();
    Navigate("/")
  }

  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ratione omnis ex minus obcaecati alias dolores distinctio aliquid sunt, nesciunt quae voluptas rem fuga officia natus delectus sit possimus quidem!</p>
         <span>Non hai un account?</span>
         <Link to="/register"><button>Registrati</button></Link> 
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username"></input>
            <input type="password" placeholder="Password"></input>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
