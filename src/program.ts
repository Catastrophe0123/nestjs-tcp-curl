import { Command } from 'commander';

export interface Options {
	pattern: string;
	url: string;
	json: boolean;
	data: any;
	humanReadable: boolean;
	onlyResponse: boolean;
}

export class Program {
	public program: Command;
	constructor() {
		this.program = new Command();

		this.program
			.name('nest-tcp-curl')
			.description('CLI to test nestjs TCP microservices')
			.version('0.1.2');

		this.program = this.program
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
			.option(
				'-j, --json',
				'Set this flag to treat the data as JSON.',
				false
			)
			.option('-hr, --human-readable', 'Human readable output', false)
			.option(
				'-o, --only-response',
				'Prints just the response json without message length',
				false
			);
	}

	parse(source: string[]): Options {
		this.program.parse(source);
		let options = this.program.opts() as Options;
		options.url = this.program.args[0];
		return options;
	}
}
