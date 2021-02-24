const { Gym } = require("../db/models");
const { Class, UserType } = require("../db/models");

exports.FindGyms = async (req, res, next) => {
  try {
    const gym = await Gym.findAll({
      include: {
        model: Class,
        as: "classes",
        attributes: ["id"],
      },
    });
    res.json(gym);
  } catch (error) {
    next(error);
  }
};

exports.ClassCreate = async (req, res, next) => {
  try {
    const admin = await UserType.findOne({
      where: {
        name: "admin",
      },
    });

    if (req.user.UserTypeId === admin.id) {
      req.body.GymId = req.gym.id;
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      const newClass = await Class.create(req.body);
      res.status(201).json(newClass);
    } else {
      res
        .status(401)
        .json({ messege: "You are not authirized to create a class" });
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.CreateGym = async (req, res, next) => {
  try {
    const admin = await UserType.findOne({
      where: {
        name: "admin",
      },
    });

    if (req.user.UserTypeId === admin.id) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      const newGym = await Gym.create(req.body);
      res.status(201).json(newGym);
    } else {
      res
        .status(401)
        .json({ messege: "You are not authirized to create a Gym" });
    }
  } catch (error) {
    next(error);
  }
};

exports.fetchGym = async (GymId, next) => {
  try {
    const foundGym = await Gym.findByPk(GymId);
    return foundGym;
  } catch (error) {
    next(error);
  }
};
