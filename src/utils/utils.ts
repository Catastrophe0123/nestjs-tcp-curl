export const serializeMessage = (message: string): string => {
	return message.length + '#' + message;
};

export const parseAddress = (url: string): { host: string; port: number } => {
	const [host, port] = url.split(':');
	const portNumber = Number(port);
	if (isNaN(portNumber)) {
		throw new Error('Port should be a number');
	}

	return { host, port: portNumber };
};
