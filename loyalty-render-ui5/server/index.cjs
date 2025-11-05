// server/index.cjs — CommonJS (works when package.json has "type": "module" too, if you call node server/index.cjs)
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const appNext = next({ dev });
const handle = appNext.getRequestHandler();

appNext.prepare().then(() => {
  const app = express();
  app.use(express.json());

  // Simple request logger
  app.use((req, _res, next) => { 
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`); 
    next(); 
  });

  // API routes BEFORE Next handler
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/users", require("./routes/users"));
  app.use("/api/export", require("./routes/export"));

  // Health
  app.get("/api/health", (_req, res) => res.json({ ok: true, name: "loyalty-ui", time: Date.now() }));

  // JSON 404 for any /api/* not matched
  app.use("/api", (req, res, next) => {
    if (res.headersSent) return next();
    res.status(404).json({ error: "NOT_FOUND", path: req.originalUrl });
  });

  // Next handler LAST
  app.all("*", (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Server started on " + port));
});
