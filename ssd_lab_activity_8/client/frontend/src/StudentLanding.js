import React, { useState, useEffect } from "react";

function StudentLanding() {
  if (!sessionStorage.getItem("userRole")) {
    window.location.href = "/LoginPage";
  } else if (sessionStorage.getItem("userRole") != "student") {
    window.location.href = "/tas/queries";
  }
  const [queries, setQueries] = useState([]);
  const [textLimit, setTextLimit] = useState();
  const [placeholderLimit, setPlaceholderLimit] = useState();
  const [ourlimit, setOutlimit] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getQueries");
        const json = await response.json();
        console.log(json);
        setQueries(json);

        var arr = new Array(queries.length).fill(ourlimit);
        setTextLimit(arr);
        setPlaceholderLimit(arr);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleCharLimit = (text, i) => {
    var limi = ourlimit;
    if (textLimit[i]) limi = textLimit[i];
    if (text.length <= limi) return text;
    else {
      return text.substring(0, limi - 3) + "..";
    }
  };

  const getTextSize = (text, i) => {
    var limi = ourlimit;
    if (textLimit[i]) limi = textLimit[i];
    if (text.length > limi) return true;
    else return false;
  };

  const handleCharLimitPlaceholder = (text, i) => {
    var limi = ourlimit;
    if (placeholderLimit[i]) limi = placeholderLimit[i];
    if (text.length <= limi) return text;
    else {
      return text.substring(0, limi - 3) + "..";
    }
  };

  const getTextSizePlaceholder = (text, i) => {
    var limi = ourlimit;
    if (placeholderLimit[i]) limi = placeholderLimit[i];
    if (text.length > limi) return true;
    else return false;
  };

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
  const handleAddQuery = async () => {
    window.location.href = "/student/addQuery";
  };

  return (
    sessionStorage.getItem("userRole") == "student" && (
      <div>
        <h1 style={{ color: "#327fa8", marginLeft: "5%" }}>Feedbacks</h1>
        <div>
          {queries.map((ele, i) => {
            if (ele.std_roll == sessionStorage.getItem("userRoll"))
              return (
                <div
                  key={i}
                  style={{
                    border: "2px solid #327fa8",
                    width: "80%",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    padding: "25px",
                    marginLeft: "5%",
                  }}
                >
                  <span style={{ display: "inline" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                      Exam Name:
                    </label>
                    {ele.exam_name}
                  </span>
                  <br />
                  <span style={{ display: "inline" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                      Course Name:
                    </label>
                    {ele.course_name}
                  </span>
                  <br />
                  <span style={{ display: "inline" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                      Question Number:
                    </label>
                    {ele.question_num}
                  </span>
                  <br />
                  <span style={{ display: "inline" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                      TA Roll No:
                    </label>
                    {ele.ta_roll}
                  </span>
                  <br />
                  <span style={{ display: "inline" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                      TA response:
                    </label>
                    {handleCharLimit(ele.ta_comment, i)}
                  </span>
                  <br />
                  {getTextSize(ele.ta_comment, i) && (
                    <button
                      onClick={() => {
                        var arr = [...textLimit];
                        arr[i] = ele.ta_comment.length;
                        setTextLimit(arr);
                      }}
                      style={{
                        border: 0,
                        backgroundColor: "#327fa8",
                        color: "white",
                        height: "30px",
                        width: "100px",
                        borderRadius: "5px",
                        marginRight: "20px",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      Read More..
                    </button>
                  )}
                  <br />
                  <span style={{ display: "inline" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                      Student comment:
                    </label>
                    {handleCharLimitPlaceholder(ele.std_comment, i)}
                  </span>
                  <br />
                  {getTextSizePlaceholder(ele.std_comment, i) && (
                    <button
                      onClick={() => {
                        var arr = [...placeholderLimit];
                        arr[i] = ele.std_comment.length;
                        setPlaceholderLimit(arr);
                      }}
                      style={{
                        border: 0,
                        backgroundColor: "#327fa8",
                        color: "white",
                        height: "30px",
                        width: "100px",
                        borderRadius: "5px",
                        marginRight: "20px",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      Read More..
                    </button>
                  )}
                  <br />
                  <span style={{ display: "inline" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                      Is Active:
                    </label>
                    {ele.IsActive && "True"}
                    {!ele.IsActive && "False"}
                  </span>
                  <br />
                </div>
              );
          })}
        </div>
        <button
          onClick={handleAddQuery}
          style={{
            border: 0,
            backgroundColor: "#327fa8",
            color: "white",
            height: "30px",
            width: "120px",
            borderRadius: "5px",
            marginBottom: "15px",
            marginLeft: "5%",
            marginRight: "5%",
          }}
        >
          Add New Query
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
            marginBottom: "15px",
          }}
        >
          Logout
        </button>
      </div>
    )
  );
}

export default StudentLanding;
