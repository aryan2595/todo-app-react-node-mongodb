const cors = require("cors");
const express = require("express");

require("dotenv-expand").expand(require("dotenv").config());
require("./src/config/connection");

const rootRoute = require("./src/routes");
const { createUser } = require("./src/seeders/userSeeder");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(process.env.URL_PREFIX, rootRoute);

app.listen(PORT, () => {
  createUser();
  console.log(`Server is running on ${process.env.HOST}`);
  console.log(`BASE URL: ${process.env.BASE_URL}`);
});
