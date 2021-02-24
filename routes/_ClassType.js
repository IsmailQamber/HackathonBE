const express = require("express");
const router = express.Router();

const {
  ClassTypeList,
  fetchClassType,
} = require("../controllers/classTypesController");

router.param("ClassTypeId", async (req, res, next, ClassTypeId) => {
  const foundClassType = await fetchClassType(ClassTypeId, next);
  if (foundClassType) {
    req.gym = foundClassType;
    next();
  } else {
    const err = new Error("No ClassType found by this ID");
    err.status = 404;
    next(err);
  }
});

router.get("/", ClassTypeList);

module.exports = router;
