const { Gym } = require("../db/models");
const { _Class } = require("../db/models/Class");

exports.ClassList = async (req, res) => {
  const classes = await _Class.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: {
      model: Gym,
      as: "gym",
      attributes: ["id"],
    },
  });
  res.json(classes);
};

exports.ClassDetails = async (req, res, next) => {
  try {
    const foundClass = await _Class.findByPk(+req.params.classId);
    if (foundClass) {
      res.status(200).json(foundClass);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchClass = async (classId, next) => {
  try {
    const foundClass = await _Class.findByPk(classId);
    return foundClass;
  } catch (error) {
    next(error);
  }
};
