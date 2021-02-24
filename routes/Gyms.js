const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  FindGyms,
  CreateGym,
  ClassCreate,
  fetchGym,
} = require("../controllers/gymController");

router.param("GymId", async (req, res, next, GymId) => {
  const foundGym = await fetchGym(GymId, next);
  if (foundGym) {
    req.gym = foundGym;
    next();
  } else {
    const err = new Error("No Cinema found by this ID");
    err.status = 404;
    next(err);
  }
});

router.get("/", FindGyms);
router.post("/", passport.authenticate("jwt", { session: false }), CreateGym);
router.post("/:GymId/classes", ClassCreate);

module.exports = router;
