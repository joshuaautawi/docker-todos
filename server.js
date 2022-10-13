const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/index");
require("dotenv").config();

app.use(cors());
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 })
);

app.use("/", router);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : process.env.PORT || 3030;
app.listen(port, () => console.log("Server listening on port " + port));
