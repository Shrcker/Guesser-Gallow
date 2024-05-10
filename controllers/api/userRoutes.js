const router = require("express").Router();
const { User } = require("../../models");
const withAuthorization = require("../../utils/auth");

// endpoint for /api/users

router.get("/", async (req, res) => {
	try {
		const userData = await User.findAll({
			include: [{ model: Score }],
		});
		res.status(200).json(userData);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const userData = await User.findByPk(req.params.id, {
			include: [{ model: Score }],
		});

		if (!userData) {
			res.status(404).json({ message: "No user was found with that id" });
			return;
		}

		res.status(200).json(userData);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/", withAuthorization, async (req, res) => {
	try {
		const userData = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			score_id: null,
		});
		res.status(200).json(userData);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.put("/:id", withAuthorization, async (req, res) => {
	try {
		const userData = await User.findByPk(req.params.id, {
			include: [{ model: Post }],
		});

		if (!userData) {
			res.status(404).json({ message: "No user was found with that id" });
			return;
		}

		const updatedUser = await userData.update({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(400).json(error);
	}
});

router.delete("/:id", withAuthorization, async (req, rest) => {
	try {
		const userData = await User.findByPk(req.params.id, {
			include: [{ model: Score }],
		});

		if (!userData) {
			res.status(404).json({ message: "No user was found with that id" });
			return;
		}

		userData.destroy();
		res.status(200).json("User deleted successfully!");
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
