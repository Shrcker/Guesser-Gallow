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
		user_id: {
			type: DataTypes.STRING,
			allownull: false,
      references: {
        model: "user",
        key: "id",
      },
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
