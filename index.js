"use strict";

var express = require("express");
var async = require("async");
var path = require("path");
var fn = require("./fn");

var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.use("/public", express.static("public")); //предоасталвяем доступ к папке public
app.use("/index/Floor1/", express.static("./index/Floor1/"));
app.use("/index/Floor2/", express.static("./index/Floor2/"));
app.use("/index/Floor3/", express.static("./index/Floor3/"));
app.use("/index/Floor4/", express.static("./index/Floor4/"));
app.use("/index/", express.static("./index/"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index/index.html"));
});

app.get("/1", function(req, res) {
  res.sendFile(path.join(__dirname + "/index/index.html"));
});

/*  */
app.get("/2", function(req, res) {
  res.sendFile(path.join(__dirname + "/index/index2.html"));
});


app.get("/3", function(req, res) {
  res.sendFile(path.join(__dirname + "/index/index3.html"));
});

app.get("/4", function(req, res) {
  res.sendFile(path.join(__dirname + "/index/index4.html"));
});


http.listen(80, function() {
  console.log("listening on *:3000");
});


io.on("connection", function(socket) {
    socket.on("getAllCabinet", (floor, callback) => {
      fn.getAllCabinet(floor).then(res => {
        callback(res)
      })
  });

  socket.on('FindRoute', (params, callback) => {
    fn.FindRoute(params).then(res => {
      callback(res)
    })
  })
});
