import React from 'react'
import "./register.scss"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { makeRequest } from '../../axios'
const Register = () => {

  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    username:"",
    password:""    
  })

  const [err, setErr] = useState(null)

  const handleChange = e =>{

    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));

  };
  console.log(inputs)

  const handleClick = async e => {
    e.preventDefault()
    try{
      await makeRequest.post("/auth/register", inputs)
    }catch(err){
      setErr(err.response.data);
    }
  }
  console.log(err)




  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1>Simple Social</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ratione omnis ex minus obcaecati alias dolores distinctio aliquid sunt, nesciunt quae voluptas rem fuga officia natus delectus sit possimus quidem!</p>
          <span>Hai già un account?</span>
          <Link to="/login"><button>Login</button></Link>
        </div>
        <div className="right">
          <h1>Registrati</h1>
          <form>
            <input type="text" placeholder="Nome completo" name='name' onChange={handleChange}></input>
            <input type="text" placeholder="Email" name='email' onChange={handleChange}></input>
            <input type="text" placeholder="Username" name='username' onChange={handleChange}></input>
            <input type="password" placeholder="Password" name='password' onChange={handleChange}></input>
            {err && err}
            <button onClick={handleClick}>Registrati</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
