const express = require("express");

const app = express();
const path = require("path");
const router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/index.html"));
  //__dirname : It will resolve to your project folder.
});

router.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/home.html"));
  //__dirname : It will resolve to your project folder.
});

router.get("/blog", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/blog.html"));
  //__dirname : It will resolve to your project folder.
});
router.get("/events", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/events.html"));
  //__dirname : It will resolve to your project folder.
});
router.get("/lists", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/lists.html"));
  //__dirname : It will resolve to your project folder.
});
router.get("/login-signup", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/login-signup-page.html"));
  //__dirname : It will resolve to your project folder.
});
router.get("/profile", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/profile.html"));
  //__dirname : It will resolve to your project folder.
});

router.get("/friends", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/feed.html"));
  //__dirname : It will resolve to your project folder.
});

//add the router
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/css")));

app.use("/", router);
app.listen(process.env.port || 3000);

const msg = `
All routes:
home: http://localhost:3000/
blog: http://localhost:3000/blog
events: http://localhost:3000/events
lists: http://localhost:3000/lists
login-signup: http://localhost:3000/login-signup
profile: http://localhost:3000/profile
feed/friends: http://localhost:3000/friends
`;

console.log("Running at Port http://localhost:3000/");
console.log(msg);
