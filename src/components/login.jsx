import { signInWithGoogle } from "../firebase";

let Login = () => {
    return( 
    <button 
    onClick={()=>{signInWithGoogle();
    }}
    className = "btn btn-primary m-4 "
    >
    Login with google
    </button>
    );
};
export default Login;