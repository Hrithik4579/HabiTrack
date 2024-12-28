const express = require("express");
const dotenv = require("dotenv");
const connectToMongo = require("./database ");
const { errorHandler, notFound } = require("./middleware/error.js");
const path = require("path");
var cors = require("cors");

dotenv.config();

connectToMongo();

const app = express();
app.use(cors());

app.use(express.json()); 

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.use(notFound);
app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, console.log(`iNotebook backend listening on port ${PORT}`));
