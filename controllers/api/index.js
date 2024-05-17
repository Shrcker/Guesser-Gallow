const router = require("express").Router();
const userRoutes = require("./userRoutes");
const scoreRoutes = require("./scoreRoutes");
const wordRoutes = require("./wordRoutes");

router.use("/users", userRoutes);
router.use("/scores", scoreRoutes);
// Adds third party API support for github
router.use("/randomWord", wordRoutes);

module.exports = router;