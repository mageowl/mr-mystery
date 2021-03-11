const { red, blue } = require("chalk");
const { getState, ERR_NOT_FOUND, ERR_NOT_JSON } = require("../getState");

exports.command = "list";

exports.describe = "List characters.";

exports.handler = async function (_argv, cList = null) {
	const characters = cList == null ? (await getState()).characters : cList;
	if (characters !== ERR_NOT_FOUND && characters !== ERR_NOT_JSON) {
		const long =
			characters
				.filter((_c, i) => (i + 1) % 2)
				.reduce((a, b) => (a.name.length > b.name.length ? a : b)).name.length +
			2;

		characters.forEach((char, i) => {
			process.stdout.write(
				`${char.name}${i % 2 ? "\n" : " ".repeat(long - char.name.length)}`
			);
		});
		if (characters.length % 2) console.log();
	} else console.log(red(`ERR: getState, code ${characters}`));
};
