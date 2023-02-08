require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
