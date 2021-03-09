const {
	getState,
	ERR_NOT_FOUND,
	ERR_NOT_JSON,
	ERR_BAD_JSON
} = require("../getState.js");

exports.command = "look";

exports.describe = "Repeat what was just said";

exports.handler = async function () {
	const state = await getState();
};
