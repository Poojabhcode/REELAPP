import { useContext } from "react";
import { firestore } from "../firebase";
import { useState, useEffect } from "react";
import { authContext } from "../AuthProvider";
import "./videoCard.css";
let VideoCard = (props) => {

    let [playing, setPlaying]= useState(false);
    let [commentBoxOpen, setCommentBoxOpen] = useState(false);
    let [currUserComment, setCurrUserComment] = useState("");
    let [comments,setComments] = useState([])
    let user=useContext(authContext);

    useEffect(()=>{


        let f = async ()=>{
        let commentsArr = props.data.comments;
        let arr = [];
       
         for(let i=0;i<commentsArr.length;i++){
        
         let commentDoc = await firestore.collection("comments").doc(commentsArr[i]).get();
      
      arr.push(commentDoc.data())
      }
      
      setComments(arr);
      };
      f()
      
      },[props]);
      


    return( 
        <div className="video-card">
        <p className= "video-card-username">{props.data.name}</p>
        <span className="video-card-music">

        <span className="material-icons">music_note</span>

            <marquee >some song</marquee>
        
        </span>

        <span
        onClick={(e) => {
            if (commentBoxOpen) {
                setCommentBoxOpen(false);
            }else{
                setCommentBoxOpen(true);
            }
        }}
        className="material-icons-outlined video-card-comment"
        >
        chat
        </span>

        <span className ="material-icons-outlined video-card-like">
            favorite_border
            </span>

            { commentBoxOpen ? (
                <div className="video-card-comment-box">
                    <div className="actual-comments">

                    {
                    comments.map((el)=>{
                    return (
                    <div className="post-user-comment">
                            <img src={el.photo} />
                            <div>
                                <h5>{el.name}</h5>
                                <p>{el.comment}</p>
                            </div>
                        </div>
                       );
                      })}


                   </div>
                   <div className="comment-form">
                    {/* jo bhi mai input tag me likhungi vo meri state me save hota rhega */}
                   <input
                     type="text"
                      value={currUserComment}
                       onChange={(e) => {
                         setCurrUserComment(e.currentTarget.value);
                     }}
                     />

                    <button 
                    onClick={async () => {

                        //jo current comment state me h use comments collection me add kr rhi hu
                        let docRef = await firestore.collection("comments").add({
                        name: user.displayName,
                        comment: currUserComment,
                        photo: user.photoURL,
                       });

                       setCurrUserComment("");

                       // to jo abhi comment mene add kia h uske document k ref se vo comment ka doc nikal lo
                       let doc = await docRef.get()
                       //us doc ki id nikal lo
                       let commentId = doc.id
                       //ye jo videoCard h uska post doc nikalo
                      let postDoc = await firestore.collection("posts").doc(props.data.id).get();

                      //us doc me comment arr h wha pr jo aapne apna comment add kia h uski id insert kr do
                      let postCommentsArr = postDoc.data().comments;
                      postCommentsArr.push(commentId);
   
                      //ab ye comments array firestore me jakr update krdo
                      await firestore.collection("posts").doc(props.data.id).update({
                      comments: postCommentsArr,
                       });
                     }}
                    >
                        Post</button>
                   </div>
                 </div>  
             ) : (
                ""   
            )}

        <video
          onClick={(e) => {
            if (playing) {
                e.currentTarget.pause();
                setPlaying(false);

            }else{
                e.currentTarget.play();
                setPlaying(true);
            }
        }}
        loop
        src={props.data.url} 
        className="video-card-video">

        </video>
    </div>

    );

};

export default VideoCard;