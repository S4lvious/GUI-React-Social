import React from 'react'
import Post from '../post/Post';
import "./posts.scss"
import { useQuery } from 'react-query'
import {makeRequest} from '../../axios'

const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId="+userId).then((res) => {
      return res.data;
    })
  );

    


  return (
    <div className="posts">
      {error
        ? "Qualcosa è andato storto!"
        : isLoading
        ? "Loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts
