import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import LoginPage from "./LoginPage";
import SignPage from "./SignupPage";
import FeedbackPage from "./FeedbackPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentLanding from "./StudentLanding";
import TaLanding from "./TaLanding";

// const handleAuth = () => {
//   if (sessionStorage.getItem("userRoll")) {
//     if (sessionStorage.getItem("role") == "student") return <StudentLanding />;
//     else if (sessionStorage.getItem("role") == "ta") return <TaLanding />;
//   } else return <LoginPage />;
// };

// const handlePath = () => {
//   if (sessionStorage.getItem("userRoll")) {
//     if (sessionStorage.getItem("role") == "student") return "StudentLanding";
//     else if (sessionStorage.getItem("role") == "ta") return "TaLanding";
//   } else return "LoginPage";
// };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student/addQuery" element={<FeedbackPage />} />
        <Route path="StudentLanding" element={<StudentLanding />} />
        <Route path="/tas/queries" element={<TaLanding />} />
        {/* <Route path="SignupPage" element={<SignPage />} /> */}
        <Route path="LoginPage" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
