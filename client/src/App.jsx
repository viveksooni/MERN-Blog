import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/SignIn";
import Project from "./pages/Project";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Header from "./components/Header/Header";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import DashBoard from "./pages/DashBoard";
import { Toaster } from "@/components/ui/toaster";
import About from "./pages/About";
import { ThemeProvider } from "./components/Theme/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Header />
        <Routes>
          <Route path="/*" element={<NotFound></NotFound>} />
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
          <Route path="/project" element={<Project />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <FooterCom />
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
