import { useContext, useEffect, useState } from "react";
import { auth, storage, firestore } from "../firebase";

import { authContext } from "../AuthProvider";
import { Navigate } from "react-router-dom";
import VideoCard from "./videoCard";

import "./home.css";

let Home = () => {
    let user = useContext(authContext);
    let [posts, setPosts] = useState([]);


    useEffect(()=>{

      let unsub = firestore.collection("posts").onSnapshot((querySnapshot) => {
      let docArr = querySnapshot.docs;
      
      let arr = [];
      
      for(let i=0; i< docArr.length; i++){
        arr.push({
         id: docArr[i].id,
         ...docArr[i].data(),
      });
       // console.log(docArr[i].data());
      }
      
      setPosts(arr);
      });

      return () =>{
       unsub();
      };

      }, []);

    return(
        <>
          {user ? "" : <Navigate to="/login" />}


          <div className="video-container">
          {posts.map((el) => {
            return <VideoCard key={el.id} data ={el} />;
          })}
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
          firestore.collection("posts").add({ name: user.displayName, url, likes: [], comments:[]});
        }); 
     });
         }}
         />
     </>
    ); 
};
export default Home;  