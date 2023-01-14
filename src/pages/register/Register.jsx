import React from 'react'
import "./register.scss"
import { Link } from 'react-router-dom'

const Register = () => {
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
            <input type="text" placeholder="Nome completo"></input>
            <input type="text" placeholder="Email"></input>
            <input type="text" placeholder="Username"></input>
            <input type="password" placeholder="Password"></input>
            <button>Registrati</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
