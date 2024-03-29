import React, { useContext } from 'react'
import "./stories.scss"
import {AuthContext} from "../../context/authContext"
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Stories = () => {

  const {currentUser} = useContext(AuthContext)


  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "Sbirulina Sbiruletta",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "Kekka Casino",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "Luigi Cuomo",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "Rosa Striano",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];


  return (
    <div className='stories'>
      <div className="story">
          <img src={"/upload/"+currentUser.profilePic}/>
          <span>{currentUser.name}</span>
          <AddCircleIcon className='button' fontSize={'large'}></AddCircleIcon>
        </div>
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img}/>
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories
