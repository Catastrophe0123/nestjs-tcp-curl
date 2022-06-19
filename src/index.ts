import net from 'net';
import { Command } from 'commander';
import { randomUUID } from 'crypto';

let program = new Command();

// Usage -> nest-tcp-curl url -p pattern --data '{hello: world}'
// Example -> nest-tcp-curl localhost:3000 -p qwerty --data { 'hello': 'world' }
program
	.name('nest-tcp-curl')
	.description('CLI to test nestjs TCP microservices')
	.version('0.0.1');

program = program
	// .command('request')
	.description('send a TCP request to an endpoint')
	.argument(
		'<url>',
		'The URL for the request. Do not include the protocol. Pass the port number separated by a colon'
	)
	.requiredOption(
		'-p, --pattern <type>',
		'The pattern for the route. Required by Nestjs for route matching.'
	)
	.requiredOption('-d, --data <type>', 'The payload of the request')
	.option('-j, --json', 'Set this flag to treat the data as JSON.', false);

program.parse(process.argv);

let options = program.opts();
console.log('options: ', options, program.args);
const url = program.args[0];

const client = new net.Socket();

const [host, port] = url.split(':');

client.connect(parseInt(port), host, () => {
	console.log('connected');
	const payload = {
		pattern: options.pattern,
		data: options.json ? JSON.parse(options.data) : options.data,
		id: randomUUID(),
	};
	const message = JSON.stringify(payload);
	let m = message.length + '#' + message;
	client.write(m);
});

client.on('data', function (data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function () {
	console.log('Connection closed');
});
