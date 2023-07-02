import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import SignUp from "./components/User/Signup";
import SignIn from "./components/User/Signin";
// import Game0 from "./components/Games/Game0/Game0";
import Game1 from "./components/Games/Game1/Game1";
import Game2 from "./components/Games/Game2/Game2";
import Game3 from "./components/Games/Game3/Game3";
// import Game4 from "./components/Games/Game4/Game4";
// import Game5 from "./components/Games/Game5/Game5";
import Board from "./components/Leaderboard/leaderboard";
import Dashboard from "./components/Dashboard/dashboard";
import Playground from "./components/Projects/Playground";
import DashboardProfiles from "./components/Dashboard/profiles";
import "./App.css";
import "./style.css";
import axios from 'axios';
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToTop from "./components/ScrollToTop";
import { useDispatch} from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate, } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [load, upadateLoad] = useState(true);
  const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
  const initializeUser = async () => {
    try {
      const response = await axios.get(
        'https://phi-v2-server.onrender.com/api/v1/users/getUserData',
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch({ type: 'setAdmin', payload: response.data.user.isAdmin });
      dispatch({ type: 'setLoggedIn', payload: true });
      // console.log('gloably authorizedXX',response.data.user.isAdmin  )
    } catch (err) {
      console.log('gloably unauthorized')
      console.log(err,' -App.js');
    }

  }
  
  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/board" element={<Board />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardProfiles" element={<DashboardProfiles />} />
          {/* <Route path="/level-0" element={<Game0 />} /> */}
          <Route path="/level-1" element={<Game1 />} />
          <Route path="/level-2" element={<Game2 />} />
          <Route path="/level-3" element={<Game3 />} />
          {/* <Route path="/level-4" element={<Game4 />} /> */}
          {/* <Route path="/level-5" element={<Game5 />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
