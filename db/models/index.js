"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.ClassType.hasMany(db.Class, { foreginKey: "ClassTypeId" });
db.Class.belongsTo(db.ClassType);

db.UserType.hasMany(db.User, { foreginKey: "UserTypeId" });
db.User.belongsTo(db.UserType);

db.Gym.hasMany(db.Class, { foreginKey: "gymId", as: "classes" });
db.Class.belongsTo(db.Gym);

db.User.belongsToMany(db.Gym, { through: "gym_users" });
db.Gym.belongsToMany(db.User, { through: "gym_users" });

module.exports = db;
