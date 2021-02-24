const express = require("express");
const app = express();
app.use(express.json());
const db = require("./db/models");

const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const cors = require("cors");
app.use(cors());

const gymRoutes = require("./routes/Gyms");
const classRouters = require("./routes/Class");
const userRoutes = require("./routes/User");
const ClassTypesRoutes = require("./routes/_ClassType");

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/gym", gymRoutes);
app.use("/class", classRouters);
app.use(userRoutes);
app.use("/classType", ClassTypesRoutes);

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
    // await db.sequelize.sync();
    console.log("connection to the database successful");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("error connetion to the database: ", error);
  }
};
run();
