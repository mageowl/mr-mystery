#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const { writeJSON } = require("fs-extra");
const yargs = require("yargs");

const cmd = yargs
	.command({
		command: "start [name]",
		handler(args) {
			writeJSON("./.mrm", {
				time: 0,
				player: args.name
			});

			console.log(`${chalk.underline.green("The game is afoot.")}`);
		}
	})
	.commandDir("actions")
	.help().argv;
