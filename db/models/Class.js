module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      name: {
        type: DataTypes.STRING,
      },
      numberOfSeats: {
        type: DataTypes.INTEGER,
      },
      bookedSeats: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATE,
      },
      time: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
    }
  );

  return Class;
};
