const express = require("express");
const router = require("./routes/router");
const app = express();

app.use(router);

const PORT = 3000;

app.listen(PORT, () =>  console.log(`Server running at ${PORT}`));