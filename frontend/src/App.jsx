import React from "react";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import User from "./components/User";
import ErrorPage from "./components/ErrorPage";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/:email" element={<User />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
