import { Message } from 'discord.js';
import { discord } from '../configs/environment';
import { ICommand } from '../interfaces/ICommand';
import { RunFunction } from '../interfaces/IEvent';

export const run: RunFunction = async (client, message: Message) => {
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.toLocaleLowerCase().startsWith(discord.prefix)
	) {
		return;
	}

	const args: string[] = message.content
		.slice(discord.prefix.length)
		.trim()
		.split(/ +/g);

	const cmd: string = args.shift();

	const command: ICommand = client.commands.get(cmd);
	if (!command) return;

	command.run(client, message, args).catch((err) => {
		message.channel.send(
			client.embed({ description: `Error: ${err}` }, message)
		);
	});
};

export const name: string = 'message';