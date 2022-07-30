import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";

function App() {
  return (
    <>
    <Router>

        <Routes>
          <Route path="/login" element={<Login/>}/> 
          <Route path="/" element={<Home/>}/> 
            
           </Routes>
      

    </Router>
    </>
  );
}

export default App;
