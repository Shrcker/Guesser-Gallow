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

		const scores = await scoreData.map((project) =>
			project.get({ plain: true })
		);

		res.render("game", {
			scores,
			logged_in: req.session.logged_in,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get("/profile", withAuthorization, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ["password"] },
			include: [{ model: Score }],
		});

		// Serialize user data so that it's readable by frontend JS
		const user = await userData.get({ plain: true });

		res.render("profile", {
			...user,
			logged_in: true,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get("/score", async (req, res) => {
	try {
		const scoreData = await Score.findAll({
			include: [{ model: User, attributes: ["name"] }],
		});

		const scores = await scoreData.map((data) => data.get({ plain: true }));

		res.render("scores", {
			...scores,
			logged_in: req.session.logged_in,
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
