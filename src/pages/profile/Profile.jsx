import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import {useQuery, useMutation, useQueryClient } from "react-query"
import { makeRequest } from '../../axios';
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Updateprofile from "../../components/updateProfile/Updateprofile";
import { useState } from "react";



const Profile = () => {

  const userId = useLocation().pathname.split("/")[2]
  const currentUser = useContext(AuthContext);
  const queryClient = useQueryClient();


  const { isLoading, error, data } = useQuery("user", () =>
  makeRequest.get("/users/find/"+ userId).then((res) => {
    return res.data;
  })
);
  const {data: relationshipData, isLoading: rIsLoading} = useQuery("relationship", () =>
  makeRequest.get("/relationships?followedUserId="+ userId).then((res) => {
    return res.data;
  })
);

const mutation = useMutation(
  (following) => {
      if(following) return makeRequest.delete("/relationships?userId="+userId);
      return makeRequest.post("/relationships/", {userId});
  },
  {
      onSuccess: () => {
      queryClient.invalidateQueries(["relationship"]);
    },
  }
);

const handleFollow = () => {
  mutation.mutate(relationshipData.includes(currentUser.currentUser.id))
}

console.log(relationshipData)

  const [openUpdate, setOpenUpdate] = useState(false)


  return (
    <div className="profile">
      <div className="images">
        <img
          src={isLoading ? "Loading" : "/upload/"+data.coverPic}
          alt=""
          className="cover"
        />
        <img
          src={isLoading ? "Loading" : "/upload/"+data.profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{isLoading ? "Loading" : data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{isLoading ? "Loading" : data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{isLoading ? "Loading" : data.website}</span>
              </div>
            </div>
            {userId==currentUser.currentUser.id ? <button onClick={()=>setOpenUpdate(true)}>Modifica</button> : <button onClick={handleFollow}>{rIsLoading? "Loading" : relationshipData.includes(currentUser.currentUser.id)? "Smetti di seguire" : "Segui"}</button>}
          </div>
          <div className="right">
            <EmailOutlinedIcon/>
            <MoreVertIcon />
          </div>
        </div>
      <Posts userId={userId}/>
      </div>
      {openUpdate && <Updateprofile setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  );
};

export default Profile;