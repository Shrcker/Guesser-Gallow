const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const scoreRoutes = require("./api/scoreRoutes");

router.use("/users", userRoutes);
router.use("/scores", scoreRoutes);

module.exports = router;


// https://random-word-api.