module.exports = (sequelize, DataTypes) => {
  const ClassType = sequelize.define(
    "ClassType",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return ClassType;
};
