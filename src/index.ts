#!/usr/bin/env node

import net from 'net';
import { randomUUID } from 'crypto';
import { Program } from './program';
import {
	deserializeMessage,
	parseAddress,
	serializeMessage,
} from './utils/utils';

// Usage -> nest-tcp-curl url -p pattern --data '{hello: world}'
// Example -> nest-tcp-curl localhost:3000 -p qwerty --data { 'hello': 'world' }
let program = new Program();

let options = program.parse(process.argv);

const { host, port } = parseAddress(options.url);

const client = new net.Socket();

client.connect(port, host, () => {
	const payload = {
		pattern: options.pattern,
		data: options.json ? JSON.parse(options.data) : options.data,
		id: randomUUID(),
	};
	const message = JSON.stringify(payload);
	let m = serializeMessage(message);
	client.write(m);
});

client.on('data', function (data) {
	if (options.humanReadable) {
		const { length, message } = deserializeMessage(data.toString());
		console.log('message length : ', length);
		console.log(JSON.stringify(JSON.parse(message), null, 4));
	} else {
		console.log(data.toString());
	}

	client.destroy(); // kill client after server's response
});
