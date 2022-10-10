import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmitSignup = async () => {
    const userToAdd = {
      rollno: rollno,
      password: password,
      role: role,
    };
    try {
      console.log(userToAdd);
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(userToAdd),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json == "User already present!") {
        if (!alert("User already present!")) {
          window.location.reload();
        }
      }
      console.log(json);
      window.location.href = "/LoginPage";
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmitLogin = async () => {
    const userToLogin = {
      rollno: rollno,
      password: password,
      role: role,
    };
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(userToLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json) {
        if (json == "No user") {
          if (!alert("Wrong credentials!")) {
            window.location.reload();
          }
        }
        console.log(json.userSession.rollno);
        sessionStorage.setItem("userRoll", json.userSession.rollno);
        sessionStorage.setItem("userRole", json.userSession.role);
        if (json.userSession.role == "student")
          window.location.href = "/StudentLanding";
        else window.location.href = "/tas/queries";
      }

      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div
      style={{
        marginLeft: "40%",
        marginTop: "10%",
        border: "2px solid #327fa8",
        width: "20%",
        paddingLeft: "3%",
        paddingBottom: "5%",
        paddingTop: "2%",
      }}
    >
      <h1 style={{ color: "#327fa8" }}>Re-Eval Portal</h1>
      <label style={{ marginRight: "25px" }}>Roll No.</label>
      <input
        id="rollno"
        type="text"
        onChange={(event) => {
          setRollno(event.target.value);
        }}
        style={{ marginBottom: "15px", width: "160px", height: "20px" }}
      />
      <br />
      <label style={{ marginRight: "10px" }}>Password</label>
      <input
        id="password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        style={{ marginBottom: "10px", width: "160px", height: "20px" }}
      />
      <br />
      <select
        name="role"
        id="role"
        onChange={(event) => {
          setRole(event.target.value);
        }}
        style={{
          marginBottom: "10px",
          width: "100px",
          textAlign: "center",
          padding: "3px",
        }}
        // defaultValue={{ value: "student" }}
      >
        <option value="student">None</option>
        <option value="student">Student</option>
        <option value="ta">TA</option>
      </select>
      <br />
      <button
        onClick={handleSubmitLogin}
        style={{
          border: 0,
          backgroundColor: "#327fa8",
          color: "white",
          height: "30px",
          width: "80px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        Login
      </button>
      <br />
      <button
        onClick={handleSubmitSignup}
        style={{
          border: 0,
          backgroundColor: "#327fa8",
          color: "white",
          height: "30px",
          width: "80px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        SignUp
      </button>
      <br />
    </div>
  );
}

export default LoginPage;
