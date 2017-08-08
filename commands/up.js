const chalk = require('chalk'),
      commands = require('../utils/commands'),
      environment = require('../utils/environment'),
      figlet = require('figlet'),
      run = require('../utils/run'),
      sites = require('../utils/sites');

const upCommand = function() {
	console.log(chalk.blue(figlet.textSync('Pilothouse', {font: 'slant'})));
	run.buildRunFiles();
	sites.hostsAllAdd();
	commands.composeCommand(['up', '-d']);
	run.waitForMysql();
	commands.mysqlCommand(
		"CREATE USER IF NOT EXISTS 'pilothouse'@'%' IDENTIFIED BY 'pilothouse';"
		+ " GRANT ALL PRIVILEGES ON *.* to 'pilothouse'@'%';"
		+ " FLUSH PRIVILEGES;",
		false
	);
};

exports.command = 'up';
exports.desc    = 'Boots up the Docker containers, and adds all necessary site entries to the host\'s hosts file.';
exports.handler = upCommand;
