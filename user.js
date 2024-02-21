const http = require("http");
const express = require("express");
var app = express();
var server = app.listen(7000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server is running on port 7000");
});
var fs = require("fs");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.get("/", function (req, res) {
  res.send("server started");
});
app.get("/listUsers", function (req, res) {
  var data = fs.readFileSync(__dirname + "/users.json"); //as byte
  res.send(String(data));
});
app.get("/user/:id", function (req, res) {
  var data = fs.readFileSync(__dirname + "/users.json");
  var users = JSON.parse(data);
  var user = users["user" + req.params.id];
  res.send(user);
});
var bodyParser = require("body-parser");
var urlEncoded = bodyParser.urlencoded({ extended: false });

app.get("/form", function (req, res) {
  res.sendFile(__dirname + "/addUser.html");
});

app.post(
  "/addUser",
  urlEncoded,
  function (
    req,
    res ///postman
  ) {
    var newUser = { name: "", password: "", profession: "" };
    newUser.name = req.body.name;
    newUser.password = req.body.password;
    newUser.profession = req.body.profession;
    var data = fs.readFileSync(__dirname + "/users.json"); //as byte
    data = JSON.parse(String(data));
    data["user4"] = newUser;
    res.send(data);
  }
);
app.delete("/deleteUser/:id", function (req, res) {
  var data = fs.readFileSync(__dirname + "/users.json");
  data = JSON.parse(String(data));
  var user = data["user" + req.params.id];
  delete data["user" + req.params.id];
  res.send(data);
});
app.post("/addUser", function (req, res) {
  res.send("user added");
});
