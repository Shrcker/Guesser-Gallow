const router = require("express").Router();
const { User, Score } = require("../models");
const withAuthorization = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const scoreData = await Score.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const scores = scoreData.map((project) => project.get({ plain: true }));

    res.render("game", {
      scores,
      logged_in: req.session.logged_in
    });
    
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;