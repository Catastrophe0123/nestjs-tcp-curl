import net from 'net';

const client = new net.Socket();

client.connect('', () => {
	console.log('connected');
	const payload = {
		pattern: 'pattern',
		data: { hello: 'world' },
		id: 'id',
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
