import { useContext } from "react";
import { auth } from "../firebase";

import { authContext } from "../AuthProvider";
import { Navigate } from "react-router-dom";

let Home = () => {
    let user = useContext(authContext);

    return(
        <>
          {user ? "" : <Navigate to="/login" />}
         <h1>Home</h1>;
        <button
         onClick={()=>{
        auth.signOut()
    }}
    >
        logout
        </button>
     </>
    ); 
};
export default Home;