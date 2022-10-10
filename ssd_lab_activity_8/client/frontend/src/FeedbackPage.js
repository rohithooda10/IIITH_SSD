import React, { useState, useEffect } from "react";

function FeedbackPage() {
  if (!sessionStorage.getItem("userRole")) {
    window.location.href = "/LoginPage";
  } else if (sessionStorage.getItem("userRole") != "student") {
    window.location.href = "/tas/queries";
  }
  const [examname, setExamname] = useState("");
  const [coursename, setCoursename] = useState("");
  const [questionno, setQuestionno] = useState("");
  const [comments, setComments] = useState("");
  const [taroll, setTaroll] = useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/logout");
      const json = await response.json();
      console.log(json);
      sessionStorage.clear();
      window.location.href = "/LoginPage";
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSubmit = async () => {
    const userToLogin = {
      exam_name: examname,
      course_name: coursename,
      question_num: questionno,
      ta_roll: taroll,
      std_roll: sessionStorage.getItem("userRoll"),
      ta_comment: "",
      std_comment: comments,
      IsActive: true,
    };
    try {
      const response = await fetch("http://localhost:3001/student/addQuery", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(userToLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      window.location.href = "/StudentLanding";
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    sessionStorage.getItem("userRole") == "student" && (
      <div
        style={{
          marginLeft: "30%",
          marginTop: "10%",
          border: "2px solid #327fa8",
          width: "40%",
          paddingLeft: "3%",
          paddingBottom: "5%",
          paddingTop: "2%",
        }}
      >
        <h1 style={{ color: "#327fa8", marginLeft: "5%" }}>Add New Query</h1>
        <span style={{ display: "inline" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>
            Exam Name:
          </label>
          <input
            id="examname"
            type="text"
            onChange={(event) => {
              setExamname(event.target.value);
            }}
            style={{
              marginBottom: "10px",
              width: "160px",
              height: "20px",
              marginLeft: "50px",
            }}
          />
        </span>
        <br />

        <span style={{ display: "inline" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>
            Course Name:
          </label>
          <input
            id="coursename"
            type="text"
            onChange={(event) => {
              setCoursename(event.target.value);
            }}
            style={{
              marginBottom: "10px",
              width: "160px",
              height: "20px",
              marginLeft: "35px",
            }}
          />
        </span>
        <br />

        {/* <label>Course name</label>
        <input
          id="coursename"
          type="text"
          onChange={(event) => {
            setCoursename(event.target.value);
          }}
        />
        <br /> */}

        <span style={{ display: "inline" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>
            Question Number:
          </label>
          <input
            id="questionno"
            type="Number"
            onChange={(event) => {
              setQuestionno(event.target.value);
            }}
            style={{
              marginBottom: "10px",
              width: "160px",
              height: "20px",
              marginLeft: "5px",
            }}
          />
        </span>
        <br />

        <span style={{ display: "inline" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>
            TA Name:
          </label>
          <select
            name="taname"
            id="taname"
            onChange={(event) => {
              setTaroll(event.target.value);
            }}
            style={{
              marginBottom: "10px",
              width: "100px",
              textAlign: "center",
              padding: "3px",
              marginLeft: "70px",
            }}
          >
            <option value="student">None</option>

            <option value="1">Ronaldo</option>
            <option value="2">Messi</option>
            <option value="3">Kaka</option>
            <option value="4">Neymar</option>
          </select>
        </span>
        <br />
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>
          Student Comments:
        </label>
        <br />
        <textarea
          id="comments"
          type="text"
          onChange={(event) => {
            setComments(event.target.value);
          }}
          style={{
            margin: "5px",
            marginLeft: 0,
            width: "80%",
          }}
        />
        <br />
        <button
          onClick={handleSubmit}
          style={{
            border: 0,
            backgroundColor: "#327fa8",
            color: "white",
            height: "30px",
            width: "80px",
            borderRadius: "5px",
            marginRight: "20px",
          }}
        >
          Post
        </button>
        <button
          onClick={handleLogout}
          style={{
            border: 0,
            backgroundColor: "#327fa8",
            color: "white",
            height: "30px",
            width: "80px",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      </div>
    )
  );
}

export default FeedbackPage;
