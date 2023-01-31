import React from 'react'
import "./login.scss"
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [inputs, setInputs] = useState({
    username:"",
    password:""    
  })



  const handleChange = e =>{

    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));

  };
  console.log(inputs)

  const [err, setErr] = useState(null)


  const Navigate = useNavigate();

  const {login} = useContext(AuthContext);
  
  const handleLogin = async (e) =>{
    e.preventDefault();
    try{
    await login(inputs);
    Navigate("/")
    }catch(err){
      setErr(err.response.data)
    }
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
            <input type="text" placeholder="Username" name='username' onChange={handleChange}></input>
            <input type="password" placeholder="Password" name='password' onChange={handleChange}></input>
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
