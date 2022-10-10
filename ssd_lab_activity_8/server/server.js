const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./User");
const QueryModel = require("./Query");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const store = new MongoDBStore({
  uri: process.env.DATABASE_CONNECTION_STRING,
  collection: "mySessions",
});

app.use(
  session({
    secret: "ssdlab",
    name: "mySessions",
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  dbName: "ssdlab7",
});

app.post("/signup", async (req, res) => {
  const userToAdd = req.body;

  const user = await UserModel.findOne({
    rollno: userToAdd.rollno,
    role: userToAdd.role,
  });
  if (user) {
    res.json("User already present!");
  } else {
    console.log(userToAdd);
    const newUser = UserModel(userToAdd);
    await newUser.save();
    res.json(newUser);
  }
});

app.post("/login", async (req, res) => {
  const userToFind = req.body;
  const user = await UserModel.findOne({
    rollno: userToFind.rollno,
    password: userToFind.password,
    role: userToFind.role,
  });
  if (user) {
    const userSession = { rollno: user.rollno, role: user.role };
    req.session.user = userSession;
    req.session.save();
    res.json({ userSession: userSession });
  } else {
    res.json("No user");
  }
});

app.post("/student/addQuery", async (req, res) => {
  console.log(req.body);
  const query = req.body;
  const newQuery = QueryModel(query);
  await newQuery.save();
  res.json(query);
});

app.get("/logout", async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  }
  res.json("LoggedOut");
});

app.get("/getQueries", (req, res) => {
  QueryModel.find({}, (err, result) => {
    if (err) {
      console.log("error");
      res.json(err);
    } else {
      res.json(result);
    }
  }).sort({ _id: -1 });
});

app.get("/taGetQueries", (req, res) => {
  QueryModel.find({}, (err, result) => {
    if (err) {
      console.log("error");
      res.json(err);
    } else {
      res.json(result);
    }
  }).sort({ IsActive: 1 });
});

app.post("/update", (req, res) => {
  console.log(req.body.id);
  QueryModel.updateOne(
    { _id: req.body.id },
    { ta_comment: req.body.taComment, IsActive: false },
    (err, result) => {
      if (err) {
        console.log("error");
        res.json(err);
      } else {
        console.log(result);
        res.json("Successfully posted your comment!");
      }
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log("server working");
});
