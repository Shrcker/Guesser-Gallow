import js from "@eslint/js";
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
	js.configs.recommended,
	{
		rules: {
			"prefer-const": [
				"error",
				{
					destructuring: "any",
					"ignoreReadBeforeAssign": false,
				},
			],
			"no-use-before-define": "error",
			"no-duplicate-case": "error",
			"no-extra-semi": "error",
			"no-empty": "error",
			curly: [
				"error",
				{
					"multi-or-nest",
				},
			],
			"eqeqeq": [
				"error",
				"smart",
			],
		},
		{
			
		}
	},
];

module.exports = [
	eslintPluginPrettierRecommended,
];