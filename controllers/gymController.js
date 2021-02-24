const { Gym } = require("../db/models");
const { _Class } = require("../db/models/Class");

exports.FindGyms = async (req, res) => {
  const gym = await Gym.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: _Class,
      as: "class",
      attributes: ["id"],
    },
  });
  res.json(gym);
};

exports.ClassCreate = async (req, res, next) => {
  try {
    req.body.GymId = req.gym.id;
    const newClass = await _Class.create(req.body);
    console.log(newClass);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.CreateGym = async (req, res) => {
  try {
    if (req.user.UserTypeId === 2) {
      // req.body.userId = req.user.id;
      const newGym = await Gym.create(req.body);
      res.status(201).json(newGym);
    } else {
      res
        .status(401)
        .json({ messege: "You are not authirized to create a Gym" });
    }
  } catch (error) {
    res.status(500).json({ messege: error.messege });
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
