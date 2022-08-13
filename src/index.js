const normalizePort = require("./utils/server/normalizePort");
const mountRoutes = require("./utils/server/mountRoutes");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const path = require("path");
const db = require("debug");
const getDbUri = require("./configs/getDbUri");
dotenv.config();

const { PORT } = process.env;
const debug = db("backend:server");

const app = express();
const server = http.createServer(app);
const port = normalizePort(PORT || "9001");
const Mdb = getDbUri();

mongoose
  .connect(Mdb, {})
  .then(() => {
    console.log(`Connected to mongodb:`, Mdb);
  })
  .catch((e) => {
    console.log(`Couldn't connect to mongodb: `, e);
  });

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-access-token", "x-refresh-token"],
    credentials: true,
  })
);
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-access-token", "x-refresh-token"],
    credentials: true,
  },
});
app.set("port", port);
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
mountRoutes(app);

io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);
  });
  // console.log("Client Conneted!");
  // socket.on("disconnection", (socket) => {
  //   console.log("Client Disconneted!");
  // });
  // socket.on("offline", (payload) => {
  //   console.log(payload);
  // });
});
// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "jade");

app.get("/", (request, response) => {
  response.render("index", { title: "AiMedicare YoshiFA API" });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`Listening on port`, port);
  debug("Listening on " + bind);
}
