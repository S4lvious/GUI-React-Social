import React from 'react'
import { useState } from 'react';
import "./updatepost.scss"
import {useQuery, useMutation, useQueryClient } from "react-query"
import { makeRequest } from '../../axios';
import axios from 'axios';

const Updatepost = ({setOpenUpdate, post}) => {
    const postId = post.id;
    const [desc, setDesc] = useState("")

    const queryClient = useQueryClient();
    const updatePostMutation = useMutation(
        (updatedPost) => {
            return makeRequest.put("/posts", updatedPost);
        },
        {
            onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        },
    }
    );
   
    
    const handleClick = async (e) =>{
        e.preventDefault()
        updatePostMutation.mutate({desc, postId})
        setOpenUpdate(false)

    };


    return (
  
    <div className='updatePost'>
        <div className="contentUpdate">
            <button onClick={()=>setOpenUpdate(false)}>X</button>
            <textarea defaultValue={post.desc} onChange={(e)=> setDesc(e.target.value)}></textarea>
            <button onClick={handleClick}>Modifica</button>
        </div>
    </div>
   
  )
}

export default Updatepost
