import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import AuthProvider from "./AuthProvider";

function App() {
  return (
    <>
    <AuthProvider>
    <Router>

        <Routes>
          <Route path="/login" element={<Login/>}/> 
          <Route path="/" element={<Home/>}/> 
            
           </Routes>
      

    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
