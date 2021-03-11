const boxen = require("boxen");
const { blue } = require("chalk");
const { getState, ERR_NOT_FOUND, ERR_NOT_JSON } = require("../getState.js");
const readline = require("readline");
const stringLength = require("string-length");
const { writeJSON } = require("fs-extra");

exports.command = "talk <firstName> <lastName>";

exports.describe = "Talk to someone.";

exports.handler = async function (argv, dialogID = null) {
	const state = await getState();
	const characters = state.characters;

	if (characters !== ERR_NOT_FOUND && characters !== ERR_NOT_JSON) {
		const charI = characters.findIndex(
			({ name }) =>
				name.toLowerCase() ===
				`${argv.firstName.toLowerCase()} ${argv.lastName.toLowerCase()}`
		);
		const char = characters[charI];

		const rl = readline
			.createInterface({
				input: process.stdin,
				output: process.stdout
			})
			.pause();

		if (char) {
			const dialog =
				dialogID == null
					? char.dialog[char.role] || char.dialog.default
					: char.dialog[dialogID];

			function type(dialog, i) {
				let string = dialog[i].replace(/\$\$CLUE/g, char.clue);

				for (const property in char.properties) {
					if (Object.hasOwnProperty.call(char.properties, property)) {
						const value = char.properties[property];
						string = string.replace("$$" + property.toUpperCase(), value);
					}
				}

				console.log(
					`${char.ascii}\n${char.name}\n${boxen(string, {
						padding: 1,
						borderStyle: "round",
						borderColor: "cyan"
					})}\n${" ".repeat(stringLength(string) + 1)}[${blue("ENTER")}]`
				);
				rl.resume();
				rl.once("line", () => {
					rl.pause();
					if (i + 1 < dialog.length) type(dialog, i + 1);
				});
			}

			type(
				dialogID == null
					? dialog[Math.min(char.conversation, dialog.length - 1)]
					: dialog,
				0
			);

			char.conversation++;
			const newData = { ...state, characters };
			newData[charI] = char;

			writeJSON("./.mrm", newData);
		} else
			console.log(
				`${argv.firstName[0].toUpperCase()}${argv.firstName
					.slice(1)
					.toLowerCase()} ${argv.lastName[0].toUpperCase()}${argv.lastName
					.slice(1)
					.toLowerCase()} is not a character!`
			);
	}
};
