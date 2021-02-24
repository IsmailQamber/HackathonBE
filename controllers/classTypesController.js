const { ClassType } = require("../db/models");

exports.ClassTypeList = async (req, res, next) => {
  try {
    const classTypeList = await ClassType.findAll();
    res.json(classTypeList);
  } catch (error) {
    next(error);
  }
};

exports.fetchClassType = async (ClassTypeId, next) => {
  try {
    const foundClassType = await ClassType.findByPk(ClassTypeId);
    return foundClassType;
  } catch (error) {
    next(error);
  }
};
