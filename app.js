const express = require("express");
const db = require("./db/models");
const gymRoutes = require("./routes/Gyms");
const classRouters = require("./routes/Class");
const userRoutes = require("./routes/User");
const ClassTypesRoutes = require("./routes/_ClassType");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/gyms", gymRoutes);
app.use("/classes", classRouters);
app.use(userRoutes);
app.use("/classType", ClassTypesRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  const err = new Error("Page not found 404");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("connection to the database successful");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("error connetion to the database: ", error);
  }
};
run();
