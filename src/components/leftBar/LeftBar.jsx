import React from 'react'
import "./leftBar.scss"
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";


const LeftBar = () => {
  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">
          <div className="user">
          <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='propic'/>
          <span>Salvatore Liccardo</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Video</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
      <hr/>
      <div className="menu">
        <span>Scorciatoie</span>
        <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Video</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messaggi</span>
          </div>
      </div>
      <hr/>
      <div className="menu">
        <span>Altro</span>
        <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorial</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Corsi</span>
          </div>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Donazioni</span>
          </div>
      </div>
      </div>
    </div>
  )
}

export default LeftBar
