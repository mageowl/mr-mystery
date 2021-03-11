const { getState, ERR_NOT_FOUND, ERR_NOT_JSON } = require("../getState");
const { blue } = require("chalk");

exports.command = "inspect <firstName> <lastName>";

exports.describe = "Inspect a suspect.";

exports.handler = async function (argv) {
	const state = await getState();

	if (state !== ERR_NOT_FOUND && state !== ERR_NOT_JSON) {
		const characters = (await getState()).characters;
		const char = characters.find(
			({ name }) =>
				name.toLowerCase() ===
				`${argv.firstName.toLowerCase()} ${argv.lastName.toLowerCase()}`
		);

		if (char == null) {
			console.log(
				`${argv.firstName[0].toUpperCase()}${argv.firstName
					.slice(1)
					.toLowerCase()} ${argv.lastName[0].toUpperCase()}${argv.lastName
					.slice(1)
					.toLowerCase()} is not a character!`
			);
		} else {
			for (const feature in char.features) {
				if (Object.hasOwnProperty.call(char.features, feature)) {
					const data = char.features[feature];
					console.log(
						`${blue(
							feature
								.replace(/([A-Z])/g, (_w, c) => " " + c.toLowerCase())
								.toUpperCase()
						)}: ${data}`
					);
				}
			}
		}
	}
};
