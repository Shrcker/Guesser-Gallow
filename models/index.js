const Score = require("./Score");
const User = require("./User");

User.hasOne(Score, {
  foreignKey: "user_id",
});

Score.belongsTo(User, {
	foreignKey: "user_id",
});

module.exports = { User, Score };