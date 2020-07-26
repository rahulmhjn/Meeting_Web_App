const path = require("path");
const express = require("express");
const morgan = require("morgan");
require("colors");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// View Engine
app.set("view engine", "ejs");

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(
    `Server running in development ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow.bold.underline
  );
});
