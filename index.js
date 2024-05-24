const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

app.use(express.static(path.join(__dirname, "public")));

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
app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");
