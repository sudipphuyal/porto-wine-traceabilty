const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(__dirname, "public");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
};

const commands = {
  "/api/hash": ["./scripts/hash-certificate.sh"],
  "/api/run-tests": ["./scripts/run-tests.sh"],
  "/api/capture-evidence": ["./scripts/capture-evidence.sh"],
};

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
}

function sendJson(res, status, payload) {
  send(res, status, JSON.stringify(payload), "application/json; charset=utf-8");
}

function runCommand(res, command) {
  const env = {
    ...process.env,
    PATH: `${process.env.HOME}/.dpm/bin:${process.env.PATH || ""}`,
  };

  execFile(command[0], command.slice(1), {
    cwd: rootDir,
    env,
    timeout: 120000,
    maxBuffer: 1024 * 1024 * 8,
  }, (error, stdout, stderr) => {
    sendJson(res, error ? 500 : 200, {
      ok: !error,
      exitCode: error && typeof error.code === "number" ? error.code : 0,
      output: `${stdout || ""}${stderr || ""}`,
    });
  });
}

function latestEvidence(res) {
  const evidenceDir = path.join(rootDir, "evidence");
  const files = fs.existsSync(evidenceDir)
    ? fs.readdirSync(evidenceDir)
      .filter((file) => /^run-.*\.log$/.test(file))
      .map((file) => {
        const fullPath = path.join(evidenceDir, file);
        return { file, fullPath, mtime: fs.statSync(fullPath).mtimeMs };
      })
      .sort((a, b) => b.mtime - a.mtime)
    : [];

  if (files.length === 0) {
    sendJson(res, 404, { ok: false, output: "No evidence log found." });
    return;
  }

  const latest = files[0];
  sendJson(res, 200, {
    ok: true,
    file: `evidence/${latest.file}`,
    output: fs.readFileSync(latest.fullPath, "utf8"),
  });
}

function serveStatic(req, res) {
  const requestPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
  const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
  const filePath = path.normalize(path.join(publicDir, relativePath));

  if (!filePath.startsWith(publicDir)) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(res, 404, "Not found", "text/plain; charset=utf-8");
      return;
    }

    const type = mimeTypes[path.extname(filePath)] || "application/octet-stream";
    send(res, 200, content, type);
  });
}

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://localhost:${port}`).pathname;

  if (req.method === "POST" && commands[pathname]) {
    runCommand(res, commands[pathname]);
    return;
  }

  if (req.method === "GET" && pathname === "/api/latest-evidence") {
    latestEvidence(res);
    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }

  sendJson(res, 405, { ok: false, output: "Method not allowed." });
});

server.listen(port, () => {
  console.log(`Porto Wine Traceability demo running at http://localhost:${port}`);
});
