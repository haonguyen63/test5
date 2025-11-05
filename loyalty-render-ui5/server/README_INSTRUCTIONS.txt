
    Insert the following block near the end of server/index.js,
    AFTER your "/api/*" routes and BEFORE the Next.js handler (app.all("*", ...)):

    // --- PATCH START: API health & JSON 404 ---
// Healthcheck
app.get("/api/health", (_req, res) => res.json({ ok: true, name: "loyalty-ui", time: Date.now() }));

// JSON 404 for all unknown /api/* (must be BEFORE Next handler)
app.use("/api", (req, res, next) => {
  // if previous routes didn't handle, return 404 JSON
  if (res.headersSent) return next();
  res.status(404).json({ error: "NOT_FOUND", path: req.originalUrl });
});
// --- PATCH END ---
