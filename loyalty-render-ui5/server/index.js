const express = require("express");
const next = require("next");
const appNext = next({ dev: process.env.NODE_ENV !== "production" });
const handle = appNext.getRequestHandler();

appNext.prepare().then(() => {
  const app = express();
  app.use(express.json());
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/users", require("./routes/users"));
  app.use("/api/export", require("./routes/export"));
  app.all("*", (req, res) => handle(req, res));
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Server started on " + port));
});