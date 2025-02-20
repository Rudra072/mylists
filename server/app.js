const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.DB_URL;
const cors = require("cors");
const boardRoutes = require("./router/boards");
const columnRoutes = require("./router/columns");
const taskRoutes = require("./router/tasks");
const userRoutes = require("./router/users");
const workspaceRoutes = require("./router/workspace");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  allowedHeaders: ["content-type"],
};

app.use(cors({ credentials: true, origin: "https://myylists.netlify.app" }));

app.use("/auth", userRoutes);

app.use(verifyJWT);
app.use("/workspace", workspaceRoutes);
app.use("/boards", boardRoutes);
app.use("/boards/:id/columns", columnRoutes);
app.use("/boards/:id/columns/:columnId/tasks", taskRoutes);

app.listen(8080, () => {
  console.log("serving on port 8080");
});
