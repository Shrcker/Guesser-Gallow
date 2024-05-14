const Score = require("./Score");
const User = require("./User");

Score.belongsTo(User, {
	foreignKey: "user_id",
});

module.exports = { User, Score };