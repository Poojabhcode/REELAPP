import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import AuthProvider from "./AuthProvider";
import { useEffect } from "react";
import { firestore } from "./firebase";

function App() {

    useEffect(() => {

      //add
     //firestore.collection("users").add({body: "this is value 2"});


     //get
    //  async function f(){
    //   let querySnapshot = await firestore.collection("users").get();
    //   console.log(querySnapshot);
    //  }

   // 2nd---------------
   async function f(){
         let querySnapshot = await firestore.collection("users").get();
         for(let i=0;i<querySnapshot.length;i++){
          console.log(querySnapshot.docs[i].data());
         }
        
         
        }
   },[]);
  
  return (
    <>
    <h1>App</h1>
    {/* <AuthProvider>
    <Router>

        <Routes>
          <Route path="/login" element={<Login/>}/> 
          <Route path="/" element={<Home/>}/> 
            
           </Routes>
      

    </Router>
    </AuthProvider> */}
    </>
  );
}

export default App;
