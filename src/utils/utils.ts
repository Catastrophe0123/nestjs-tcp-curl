import chalk from 'chalk';

export const serializeMessage = (message: string): string => {
	return message.length + '#' + message;
};

export const parseAddress = (url: string): { host: string; port: number } => {
	const [host, port] = url.split(':');
	const portNumber = Number(port);
	if (isNaN(portNumber)) {
		console.error(chalk.red('Port should be a number'));
		process.exit(1);
	}

	return { host, port: portNumber };
};
