const { readJSON, existsSync } = require("fs-extra");

exports.ERR_NOT_FOUND = -1;
exports.ERR_NOT_JSON = -2;
exports.ERR_BAD_JSON = -3;

exports.getState = function () {
	if (existsSync("./.mrmgame")) {
		return new Promise((resolve) => {
			readJSON("./.mrm")
				.then((data) => {
					resolve(data);
				})
				.catch(() => {
					resolve(exports.ERR_JSON_FAIL);
				});
		});
	} else return Promise.resolve(exports.ERR_NOT_FOUND);
};
