module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define(
    "UserType",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return UserType;
};
