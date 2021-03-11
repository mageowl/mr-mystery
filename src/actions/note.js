const { writeJSON } = require("fs-extra");
const { getState } = require("../getState");

exports.command = "note [text]";

exports.builder = {
	list: {
		alias: "l",
		type: "boolean"
	},
	add: {
		alias: "a",
		type: "boolean"
	},
	remove: {
		alias: "r",
		type: "boolean"
	},
	clear: {
		alias: "c",
		type: "boolean"
	}
};

exports.handler = async function (argv) {
	const state = await getState();
	let notes = state.notes;
	if (argv.add) {
		notes.push(argv.text);
		notes.forEach((n) => console.log(n));
	} else if (argv.list) {
		notes.forEach((n) => console.log(n));
	} else if (argv.remove) {
		notes.pop();
		notes.forEach((n) => console.log(n));
	} else if (argv.clear) {
		notes = [];
	}

	writeJSON("./.mrm", { ...state, notes });
};
