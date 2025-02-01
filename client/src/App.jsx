import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Project from "./pages/Project";
import Header from "./components/Header";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import DashBoard from "./pages/DashBoard";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
          </Route>
          <Route path="/project" element={<Project />}></Route>
        </Routes>
        <FooterCom />
      </Router>
    </>
  );
}

export default App;
