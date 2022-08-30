import { useContext } from "react";
import { auth, storage } from "../firebase";

import { authContext } from "../AuthProvider";
import { Navigate } from "react-router-dom";
import VideoCard from "./videoCard";

import "./home.css";

let Home = () => {
    let user = useContext(authContext);

    return(
        <>
          {user ? "" : <Navigate to="/login" />}

          <div className="video-container">
            <VideoCard />
          </div>
        
        <button className = "home-logout-btn"
         onClick={()=>{
        auth.signOut()
    }}
    >
        Logout
        </button>

        <input
         type = "file"
         onClick={(e)=>{
          e.currentTarget.value = null;
         }}
         onChange={(e) => {
          let videoObj = e.currentTarget.files[0];
          let { name, size, type } = videoObj;

          size = size / 1000000;

          if(size > 10) {
            alert("file size exceeds 10mb");
            return;
          }
          
          //console.log(type);
          type = type.split("/")[0];
          //console.log(type);
          
          
          if (type !== "video"){
            alert("please upload a video file");
            return;
          }

         // storage.ref(`/posts/${user.uid}/${Date.now() +"="+ name}`).put(videoObj);
        //  let storage = firebase.storage();
        let uploadTask =  storage.ref(`/posts/${user.uid}/${Date.now() +"="+ name}`).put(videoObj);

          uploadTask.on("state_changed", null, null, () =>{
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
        }); 
     });
         }}
         />
     </>
    ); 
};
export default Home;  