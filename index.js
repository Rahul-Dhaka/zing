const path = require("path");
const express = require("express");
const app = new express();
const PORT = 4422;
const { createServer } = require("http");
const { Server } = require("socket.io");
const hbs= require('hbs');
const httpServer = createServer(app);
const io = new Server(httpServer);

// for vercel
// var exphbs  = require('express-handlebars');
// var hbs = exphbs.create({ /* config */ });
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', './views');

// hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
// ----end for vercel

// app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("zing");
});

app.get("/ping", (req, res) => {
  res.send('pong');
});

const onConnection = (socket)=>{
  require('./utility/chattingApp')(socket,io);
};

io.on("connection", onConnection);

httpServer.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT);
});
