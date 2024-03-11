const path = require("path");
const express = require("express");
const app = new express();
const PORT = 4422;
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("zing");
});

const onConnection = (socket)=>{
  require('./utility/chattingApp')(socket,io);
};

io.on("connection", onConnection);

httpServer.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT);
});
