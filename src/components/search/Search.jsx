import React from 'react'
import "./search.scss"
import { Link } from 'react-router-dom'

const Search = ({data}) => {
    
    return (
    <div className='searchResult'>
      { data && <Link to={`/profile/${data.id}`} style={{textDecoration:"none", color:"inherit"}}><div className="userResult">
        <img src={"/upload/"+data.profilePic}></img>
     <span>{data.name}</span>
      </div></Link>}
    </div>
  )
}

export default Search
