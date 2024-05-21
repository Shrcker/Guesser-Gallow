const router = require("express").Router();
const { Score, User } = require("../../models");
const withAuthorization = require("../../utils/auth");

router.get("/", async (req, res) => {
	try {
		const scoreData = await Score.findAll({
			include: [{ model: User, attributes: ["name"] }],
		});
		res.status(200).json(scoreData);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const scoreData = await Score.findByPk(req.params.id, {
			include: [{ model: User }],
		});

		if (!scoreData) {
			res.status(404).json({ message: "No score was found with that id" });
			return;
		}

		res.status(200).json(scoreData);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/", withAuthorization, async (req, res) => {
	try {
		const scoreData = await Score.create({
			high_scores: req.body.high_scores,
			user_id: req.session.user_id,
		});

		res.status(200).json(scoreData);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.put("/", withAuthorization, async (req, res) => {
	try {
		const scoreData = await Score.findByPk(req.body.id, {
			include: [{ model: User }],
		});

		if (!scoreData) {
			res.status(404).json({ message: "No scores were found with that id" });
			return;
		}

		const updatedScore = await scoreData.update({
			high_scores: req.body.high_scores,
		});
		res.status(200).json(updatedScore);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.delete("/:id", withAuthorization, async (req, res) => {
	try {
		const scoreData = await Score.findByPk(req.params.id, {
			include: [{ model: User }],
		});

		if (!scoreData) {
			res.status(404).json({ message: "No scores wered found with that id" });
		}

		scoreData.destroy();
		res.status(200).json("User deleted successfully!");
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
