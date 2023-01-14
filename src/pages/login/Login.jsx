import React from 'react'
import "./login.scss"

const Login = () => {
  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ratione omnis ex minus obcaecati alias dolores distinctio aliquid sunt, nesciunt quae voluptas rem fuga officia natus delectus sit possimus quidem!</p>
          <span>Non hai un account?</span>
          <button>Registrati</button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username"></input>
            <input type="password" placeholder="Password"></input>
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
