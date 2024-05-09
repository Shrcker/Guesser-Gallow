const Score = require("./Score");
const User = require("./User");

Post.belongsTo(User, {
	foreignKey: "user_id",
});

module.exports = { User, Score };