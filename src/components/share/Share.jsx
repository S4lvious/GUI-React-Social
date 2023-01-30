import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";


const Share = () => {

  const {currentUser} = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [desc, setDesc] = useState("")

  const upload = async () =>{
    try{ 
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData);
      return res.data

    }catch(err){
      console.log(err)
    }
  }


  const queryClient = useQueryClient();


  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) =>{
    e.preventDefault();
    if (desc.trim().length !== 0) {
      console.log('input value is NOT empty');
      let imgUrl ="";
      if(file) imgUrl = await upload();
      mutation.mutate({desc, img:imgUrl});
      setDesc("")
      setFile(null)

    } else {
      console.log('input value is empty');
    }
    
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img
            src={"/upload/"+currentUser.profilePic}
            alt=""
            />
          <input type="text" 
          placeholder={`A cosa sto io ${currentUser.name} pensando ora?`} 
          onChange={(e)=> setDesc(e.target.value)} 
          value = {desc}
          />
          </div>
          <div className="right">
          {file && <img className="file" alt="" src={URL.createObjectURL(file)}/>}

          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"} } onChange={(e)=> setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Aggiungi immagine</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Luogo</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tagga Amici</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick} disabled={!desc}>Posta</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
