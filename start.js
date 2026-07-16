const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const os = require("os");

const rootDir = __dirname;
const backendDir = path.join(rootDir, "backend");
const frontendDir = path.join(rootDir, "frontend");

const startBackend = () => {
  return spawn("npm", ["start"], {
    cwd: backendDir,
    shell: true,
    stdio: "inherit",
  });
};

const startFrontend = () => {
  return spawn("npm", ["run", "dev", "--", "--host", "0.0.0.0"], {
    cwd: frontendDir,
    shell: true,
    stdio: "inherit",
  });
};

const openBrowser = (url) => {
  const command = os.platform() === "win32"
    ? `start "" ${url}`
    : os.platform() === "darwin"
      ? `open ${url}`
      : `xdg-open ${url}`;

  spawn(command, { shell: true, stdio: "ignore", detached: true }).unref();
};

const tryOpenAvailablePort = (ports) => {
  const checkPort = (index) => {
    if (index >= ports.length) {
      openBrowser("http://localhost:5173");
      return;
    }

    const port = ports[index];
    const req = http.get(`http://127.0.0.1:${port}`, (res) => {
      res.resume();
      openBrowser(`http://localhost:${port}`);
    }).on("error", () => {
      setTimeout(() => checkPort(index + 1), 500);
    });

    req.setTimeout(800, () => {
      req.destroy();
      setTimeout(() => checkPort(index + 1), 500);
    });
  };

  checkPort(0);
};

const backend = startBackend();
const frontend = startFrontend();

backend.on("exit", (code) => {
  if (code !== 0) {
    console.error("Backend exited unexpectedly.");
  }
});

frontend.on("exit", (code) => {
  if (code !== 0) {
    console.error("Frontend exited unexpectedly.");
  }
});

setTimeout(() => {
  tryOpenAvailablePort([5173, 5174, 5175, 5176, 5177, 5178, 5179, 5180]);
}, 5000);
