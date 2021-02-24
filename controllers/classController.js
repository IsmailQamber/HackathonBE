const { Gym, Class } = require("../db/models");

exports.ClassList = async (req, res) => {
  const classes = await Class.findAll();
  res.json(classes);
};

exports.ClassDetails = async (req, res, next) => {
  try {
    const foundClass = await Class.findByPk(+req.params.classId);
    if (foundClass) {
      res.status(200).json(foundClass);
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchClass = async (classId, next) => {
  try {
    const foundClass = await Class.findByPk(classId);
    return foundClass;
  } catch (error) {
    next(error);
  }
};
