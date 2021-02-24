module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define(
    "Gym",
    {
      name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Gym;
};
