const express = require("express");
const router = express.Router();

const {
  ClassList,
  ClassDetails,
  fetchClass,
} = require("../controllers/classController");

router.param("classId", async (req, res, next, classId) => {
  const foundClass = await fetchClass(classId, next);
  if (foundClass) {
    res.class = foundClass;
    next();
  } else {
    const err = new Error("No movie found by this ID");
    err.status = 404;
    next(err);
  }
});

router.get("/", ClassList);
router.get("/:classId", ClassDetails);

module.exports = router;
