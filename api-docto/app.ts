import express = require("express");
import path = require("path");
import dotenv = require("dotenv");
import { firstTime } from "./src/init/db.medic.user.js";

// tslint:disable: no-var-requires
const ParseServer = require("parse-server").ParseServer;
const ParseDashboard = require("parse-dashboard");
import Parse = require("parse/node");

export const parse = Parse;
// Config server
const app = express();

const result = dotenv.config({ path: "./src/config/.env" });

if (result.error) {
  throw result.error;
}

const SERVER_PORT = process.env.PORT || 8080;
const SERVER_HOST = process.env.HOST || "localhost";
const APP_ID = process.env.APP_ID || "first-parse-server";

// Secret
const MASTER_KEY = process.env.MASTER_KEY || "F23xUQdRmQLQwxV5N6a74kqF8aPqIM9F";
const DATABASE_URI = process.env.DATABASE_URI;
const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";
const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH || "parse:server";

// Config parse Server
const parseServerAPI = new ParseServer({
  databaseURI: DATABASE_URI,
  cloud: path.resolve(__dirname, "src/cloud/main.js"),
  appId: APP_ID,
  masterKey: MASTER_KEY,
  serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`,
});

if (IS_DEVELOPMENT) {
  let users;
  if (DASHBOARD_AUTH) {
    const [user, pass] = DASHBOARD_AUTH.split(":");
    users = [{ user, pass }];
  }
  const dashboard = ParseDashboard(
    {
      apps: [
        {
          serverURL: "/parse",
          appId: APP_ID,
          masterKey: MASTER_KEY,
          appName: "Parse-Server-Docto",
        },
      ],
      users,
    },
    IS_DEVELOPMENT
  );
  app.use("/dashboard", dashboard);
}

app.use("/parse", parseServerAPI);

parse.initialize(APP_ID, undefined, process.env.MASTER_KEY);

parse.serverURL = `http://${process.env.HOST}:${process.env.PORT}/parse`;

firstTime();

app.get("/", (req, res) => {
  res.end("IS_DEVELOPMENT => " + IS_DEVELOPMENT);
});

app.listen(SERVER_PORT, () =>
  console.log(
    `Notre serveur tourne en mode ${process.env.NODE_ENV ||
      "development"} sur http://localhost:${SERVER_PORT}`
  )
);
