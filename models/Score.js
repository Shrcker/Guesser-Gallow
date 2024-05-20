const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Score extends Model {}

Score.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
    high_scores: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "score",
	}
);

module.exports = Score;
