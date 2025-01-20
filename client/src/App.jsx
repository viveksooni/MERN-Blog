import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Project from "./pages/Project";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
          <Route path="/project" element={<Project />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
