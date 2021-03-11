const {
	getState,
	ERR_NOT_FOUND,
	ERR_NOT_JSON,
	ERR_BAD_JSON
} = require("../getState.js");
const { readFile, unlink } = require("fs-extra");
const { join } = require("path");
const { blue, red, green, underline } = require("chalk");

exports.command = "confront <firstName> <lastName>";

exports.describe = "Confront a suspect.";

exports.handler = async function (argv) {
	const state = await getState();

	if (state !== ERR_NOT_FOUND && state !== ERR_NOT_JSON) {
		const characters = state.characters;
		const culprit = characters.find(({ role }) => role === "culprit");
		let showRoles = true,
			correct = false;
		if (
			culprit.name.toLowerCase() ===
			`${argv.firstName.toLowerCase()} ${argv.lastName.toLowerCase()}`
		) {
			console.log(
				(await readFile(
					join(__dirname, "../../ascii/mr-mystery.txt"),
					"utf-8"
				)) + "\n"
			);
			console.log(
				`${green.underline("You did it!")} ${
					culprit.name
				} was indeed the culprit.`
			);
			correct = true;
		} else if (
			characters.find(
				({ name }) =>
					name.toLowerCase() ===
					`${argv.firstName.toLowerCase()} ${argv.lastName.toLowerCase()}`
			)
		) {
			console.log(underline`Sorry, ${culprit.name} was the culprit.`);
		} else {
			console.log(
				`${argv.firstName[0].toUpperCase()}${argv.firstName
					.slice(1)
					.toLowerCase()} ${argv.lastName[0].toUpperCase()}${argv.lastName
					.slice(1)
					.toLowerCase()} is not a character!`
			);
			showRoles = false;
		}

		if (showRoles) {
			const long =
				characters
					.filter((_c, i) => (i + 1) % 2)
					.reduce((a, b) => (a.name.length > b.name.length ? a : b)).name
					.length + 2;
			characters.forEach(({ name, role }, i) => {
				if ((i + 1) % 2) console.log();
				process.stdout.write(
					(role === "victim"
						? blue(name)
						: role === "culprit"
						? red(name)
						: name) + (i % 2 ? "" : " ".repeat(long - name.length))
				);
			});
			console.log();

			if (correct) {
				let victimName = characters.find(({ role }) => role === "victim").name;

				require("./talk.js").handler(
					{
						firstName: victimName.split(" ")[0],
						lastName: victimName.split(" ")[1]
					},
					"victimSuccess"
				);
			}

			unlink("./.mrm");
		}
	} else console.log(red(`ERR: getState, code ${state}`));
};
