// server/index.js — HARD FIX
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const appNext = next({ dev });
const handle = appNext.getRequestHandler();

appNext.prepare().then(() => {
  const app = express();

  // Basic JSON / body
  app.use(express.json());

  // Simple request logger (helps on Render logs)
  app.use((req, _res, next) => { 
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`); 
    next(); 
  });

  // ==== API ROUTES (mount BEFORE Next handler) ====
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/users", require("./routes/users"));
  app.use("/api/export", require("./routes/export"));

  // Healthcheck
  app.get("/api/health", (_req, res) => res.json({ ok: true, name: "loyalty-ui", time: Date.now() }));

  // JSON 404 for any /api/* not handled above
  app.use("/api", (req, res, next) => {
    if (res.headersSent) return next();
    res.status(404).json({ error: "NOT_FOUND", path: req.originalUrl });
  });

  // ==== Next.js handler MUST be last ====
  app.all("*", (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Server started on " + port));
});
