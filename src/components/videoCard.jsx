import { useState } from "react";
import "./videoCard.css";
let VideoCard = () => {

    let [playing, setPlaying]= useState(false);
    let [commentBoxOpen, setCommentBoxOpen] = useState(false);

    return( 
        <div className="video-card">
        <p className= "video-card-username">Fake user</p>
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
                        <div className="post-user-comment">
                            <img src="https://cdn.statusqueen.com/dpimages/thumbnail/dp%20image58-681.jpg" />
                            <div>
                                <h5>user name</h5>
                                <p>This is actual comment</p>
                            </div>
                        </div>
                        <div className="post-user-comment">
                            <img src="https://cdn.statusqueen.com/dpimages/thumbnail/dp%20image58-681.jpg" />
                            <div>
                                <h5>user name</h5>
                                <p>This is actual comment</p>
                            </div>
                        </div>
                   </div>
                   <div className="comment-form">
                    <input type="text" />
                    <button>Post</button>
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
        src="https://player.vimeo.com/external/392040372.hd.mp4?s=1675468c44692b5d9eae60ac813aab887d3b4620&profile_id=174&oauth2_token_id=57447761" 
        className="video-card-video">

        </video>
    </div>

    );

};

export default VideoCard;