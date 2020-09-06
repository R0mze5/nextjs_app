/* eslint-disable no-console */
const express = require("express");
const { join } = require("path");
const next = require("next");
const http = require("http");
const https = require("https");
const fs = require("fs");
const chalk = require("chalk");

const httpPort = 3080;
const httpsPort = 3443;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const printError = (error) => {
  console.log(
    chalk.red(
      `=====================================================
${error}
=====================================================`,
    ),
  );
};

(async () => {
  try {
    await app.prepare();

    server.get("/service-worker.js", (req, res) =>
      res.sendFile(join(".next", "/service-worker.js"), { root: "." }),
    );

    // default request handler by next handler:
    server.get("*", (req, res) => handle(req, res));

    console.log(
      chalk.green("====================================================="),
    );

    // create HTTP server
    await http.createServer(server).listen(httpPort, (err) => {
      if (err) {
        throw err;
      }

      console.log(`> HTTP Server Ready on http://localhost:${httpPort}`);
    });

    // set options for https
    const options = {
      hostname: "localhost",
      port: httpsPort,
      path: "/",
      method: "GET",
      key: fs.readFileSync(join(__dirname, "../certificates", "localhost.key")),
      cert: fs.readFileSync(
        join(__dirname, "../certificates", "localhost.crt"),
      ),
    };

    // create HTTPS server
    if (options?.key && options?.cert) {
      await https.createServer(options, server).listen(httpsPort, (err) => {
        if (err) {
          throw err;
        }

        console.log(`> HTTPS Server Ready on https://localhost:${httpsPort}`);
      });
    }
  } catch (error) {
    printError(error);
  }
})();
