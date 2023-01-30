import React, { useContext } from 'react'
import {AuthContext} from "../../context/authContext"
import "./comments.scss"
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {makeRequest} from '../../axios'
import moment from 'moment'
import { useState } from 'react'

const Comments = ({postId}) => {

  const [desc, setDesc] = useState("")

  const { isLoading, error, data } = useQuery(["comments"], () =>
  makeRequest.get("/comments?postId="+ postId).then((res) => {
    return res.data;
  })
);


const queryClient = useQueryClient();


const mutation = useMutation(
  (newComment) => {
    return makeRequest.post("/comments", newComment);
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  }
);

const handleClick = async (e) =>{
  e.preventDefault();
  if (desc.trim().length !== 0) {
    console.log('input value is NOT empty');
    mutation.mutate({desc, postId});
    setDesc("")
  } else {
    console.log('input value is empty');
  }
};


  const {currentUser} = useContext(AuthContext)

  return (
    <div className='comments'>
      <div className="write">
      <img src={"/upload/"+currentUser.profilePic}></img>
      <input type="text" placeholder="Scrivi un commento" onChange={e=>setDesc(e.target.value)} value={desc}></input>
      <button onClick={handleClick} disabled={!desc}>Invia</button>
      </div>
      {isLoading ? "Loading" : data.map(comment=>(
        <div className='comment' key={comment.id}>
          <img src={"/upload/"+comment.profilePic}></img>
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className='date'>{moment(comment.createdAt).fromNow}</span>
        </div>
      ))
    }
    
      
    </div>
  )
}

export default Comments
