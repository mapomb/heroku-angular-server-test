"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// import * as socketio from "socket.io";
//import * as path from "path";
const cors = require("cors");
const PORT = 3000;
const app = express();
app.use(cors());
app.set("port", PORT);
let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
    }
});
app.get("/", (req, res) => {
    res.send("hello world");
});
// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on('user-connect', function (data) {
        var msg = data;
        console.log(msg);
        socket.broadcast.emit('new-user', data);
    });
    socket.on('message', function (data) {
        var msg = data;
        console.log(msg);
        socket.broadcast.emit('new-message', data);
    });
});
const server = http.listen(PORT, function () {
    console.log("listening on port " + PORT);
});
//# sourceMappingURL=server.js.map