const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const productsRouter = require("./routes/api/products");
const diaryRouter = require("./routes/api/diaries");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/diary", diaryRouter);
app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(YAML.load("./openapi.yaml"))
);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

module.exports = app;
