import React, { useContext, useState } from 'react'
import "./post.scss"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import moment from "moment"
import Updatepost from '../updatePost/Updatepost';
import { AuthContext } from '../../context/authContext';
import {useQuery, useMutation, useQueryClient } from "react-query"
import { makeRequest } from '../../axios';
import axios from 'axios';

const Post = ({post}) => {

  const [commentOpen, setCommentOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const currentUser = useContext(AuthContext)


  const queryClient = useQueryClient();
  const deletePostMutation = useMutation(
    (postId) => {
        return makeRequest.delete("/posts/"+postId);
    },
    {
        onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = async () => {
    deletePostMutation.mutate(post.id)
  }


  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId="+post.id).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (liked) => {
        if(liked) return makeRequest.delete("/likes?postId="+post.id);
        return makeRequest.post("/likes/", {postId: post.id});
    },
    {
        onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.currentUser.id))
  }
  

  return (
    
    <div className='post'>
      <div className="container">
      <div className="user">
        <div className="userInfo">
          <img src={"/upload/"+post.profilePic}/>
          <div className="details">
            <Link to={`/profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}><span className='name'>{post.name}</span> </Link>
            <span className="date">{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        {currentUser.currentUser.id === post.userId && (<MoreHorizIcon onClick={()=>setMenuOpen(!menuOpen)}/>)}
        {menuOpen && <div className='menu'><button onClick={()=>{setOpenUpdate(true); setMenuOpen(false);}} >Modifica</button><button onClick={()=>{handleDelete(); setMenuOpen(false);}}>Elimina</button></div>} 
      </div>
      <div className="content">
        <p>{post.desc}</p>
        <img src={"../upload/" + post.img} alt=""></img>
      </div>
      <div className="info">
        <div className="item " onClick={()=>setIsLiked(!isLiked)}>
          {isLoading ? ("Loading") : data.includes(currentUser.currentUser.id) ? (<FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike}/>) : (<FavoriteBorderOutlinedIcon onClick={handleLike}/>)}
         {isLoading ? "Loading" : data.length} Mi piace
        </div>
        <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
          <TextsmsOutlinedIcon/>
          Commenti
        </div>
        <div className="item">
          <ShareOutlinedIcon/>
          8 Condivisioni
        </div>
      </div>
      {commentOpen && <Comments postId={post.id}/>}
    </div>
    {openUpdate && <Updatepost setOpenUpdate={setOpenUpdate}post={post}/>}
</div>

  )
}

export default Post
