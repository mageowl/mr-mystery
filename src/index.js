#!/usr/bin/env node

const { version } = require("../package.json");
const chalk = require("chalk");
const boxen = require("boxen");
const {
	writeJSON,
	unlink,
	existsSync,
	readJSON,
	writeFile
} = require("fs-extra");
const yargs = require("yargs");
const generateMystery = require("./generateMystery");

const cmd = yargs
	.command({
		command: "start",
		builder: {
			code: {
				aliases: "c",
				type: "string"
			}
		},
		handler(argv) {
			const characters = generateMystery(argv.code);

			writeJSON("./.mrm", {
				characters,
				notes: []
			});

			console.log(`${chalk.underline.yellow("The game is afoot.")}\n`);

			require("./actions/list.js").handler(characters);
		}
	})
	.command({
		command: "giveup",
		handler() {
			if (existsSync("./.mrm")) {
				console.log(chalk.italic.dim("Mr. Mystery was never found...."));
				unlink("./.mrm");
			} else {
				console.log("There is no mystery to give up on.");
			}
		}
	})
	.command({
		command: "info",
		async handler() {
			console.log(chalk.blue("Mr. Mystery"));
			console.log(`v${version}`);
			console.log();

			const gameInProgress = existsSync("./.mrm");
			console.log(
				gameInProgress
					? chalk.green("Game in progress...")
					: "Game file not found in current directory."
			);

			if (gameInProgress) {
				const json = await readJSON("./.mrm");
				console.log(
					`${json.characters.length} characters. Run mrm char --list to receive full list.`
				);
				console.log(
					`You have talked to ${
						json.characters.filter((c) => c.conversation > 0).length
					}/${json.characters.length} characters.`
				);
			}
		}
	})
	.commandDir("actions")
	.help().argv;
