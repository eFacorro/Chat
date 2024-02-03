const { 
  wsInit } = require("./webSocket.js");

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const carpetaStatic = path.join(__dirname, "static");

app.use(express.static(carpetaStatic));

wsInit();

app.listen(3000, function () {
  console.log("Server running");
});

