import React, { useState, useEffect } from "react";

function TaLanding() {
  if (!sessionStorage.getItem("userRole")) {
    window.location.href = "/LoginPage";
  } else if (sessionStorage.getItem("userRole") != "ta") {
    window.location.href = "/StudentLanding";
  }
  const [queries, setQueries] = useState([]);
  const [taComment, setTaComment] = useState("");
  const [textLimit, setTextLimit] = useState();
  const [placeholderLimit, setPlaceholderLimit] = useState();
  const [ourlimit, setOutlimit] = useState(30);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/taGetQueries");
        const json = await response.json();
        // console.log(json);
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

  const handlePost = async () => {
    try {
      const response = await fetch("http://localhost:3001/update", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id: id, taComment: taComment }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      alert(json);
      window.location.href = "/tas/queries";
    } catch (error) {
      console.log("error", error);
    }
  };

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

  return (
    sessionStorage.getItem("userRole") == "ta" && (
      <div>
        <h1 style={{ color: "#327fa8", marginLeft: "5%" }}>
          Student's Concerns
        </h1>
        <div>
          {queries.map((ele, i) => {
            if (ele.ta_roll == sessionStorage.getItem("userRoll"))
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
                      Student Roll No:
                    </label>
                    {ele.std_roll}
                  </span>
                  <br />
                  <span style={{ display: "inline" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                      Your Response:
                    </label>
                    <br />
                    <textarea
                      name="taComment"
                      type="text"
                      placeholder={
                        !ele.IsActive
                          ? handleCharLimitPlaceholder(ele.ta_comment, i)
                          : "Enter your response.."
                      }
                      onChange={(event) => {
                        setTaComment(event.target.value);
                        setId(ele._id);
                      }}
                      readOnly={!ele.IsActive}
                      style={{
                        margin: "5px",
                        marginLeft: 0,
                        width: "80%",
                      }}
                    />
                  </span>
                  <br />
                  {getTextSizePlaceholder(ele.ta_comment, i) && (
                    <button
                      onClick={() => {
                        var arr = [...placeholderLimit];
                        arr[i] = ele.ta_comment.length;
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
                  {ele.IsActive && (
                    <button
                      onClick={handlePost}
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
                  )}
                  <br />
                  <span style={{ display: "inline" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                      Student Comment:
                    </label>
                    {handleCharLimit(ele.std_comment, i)}
                  </span>
                  <br />
                  {getTextSize(ele.std_comment, i) && (
                    <button
                      onClick={() => {
                        var arr = [...textLimit];
                        arr[i] = ele.std_comment.length;
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
          onClick={handleLogout}
          style={{
            border: 0,
            backgroundColor: "#327fa8",
            color: "white",
            height: "30px",
            width: "80px",
            borderRadius: "5px",
            marginLeft: "5%",
            marginBottom: "5%",
          }}
        >
          Logout
        </button>
      </div>
    )
  );
}

export default TaLanding;
