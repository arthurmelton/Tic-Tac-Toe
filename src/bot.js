require("dotenv").config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "!";

client.on('ready', () => {
	console.log(`${client.user.tag} bot is on`);
	client.user.setActivity(`${PREFIX}help`, { type: 'WATCHING' })
  		.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  		.catch(console.error);
})

client.on('message', (message) => {
	if (message.author.bot === true) return;
	if (!message.content.startsWith(PREFIX)) return;
	console.log(`[${message.author.tag}]: ${message.content}`);
	const [commandName, ...args] = message.content
		.trim()
		.substring(PREFIX.length)
		.split(/\s+/);
	if (commandName === 'play') {
		if (args.length === 0) {
			message.channel.send('Sorry you need to @ a person.');
			return;
		}
		const play2Id = args[0].replace(/[^0-9]/g,'');
		const play1Id = message.author.id;
		const play2 = message.guild.members.cache.get(play2Id);
		const play1 = message.guild.members.cache.get(play1Id);
		const filterP1 = (n) => n.author.id === play1Id;
		const filterP2 = (n) => n.author.id === play2Id;
		if (!play2) {
			message.channel.send('Sorry I do not know that person.');
			return;
		}
		if (play2Id === '824825760954974238') {
			message.channel.send(`<@!${play1Id}>, I am sorry but you cant play with me but maybe in the future you will!`);
			return;
		}
		message.channel.send(`<@!${play2Id}>, <@!${play1Id}> invited you to play tic tac toe! Do you want to play? (${PREFIX}y/${PREFIX}n)`);
		message.channel.awaitMessages(filterP2, { max: 1, time: 60000, errors: ['Line']})
			.then((collected) => {
				const msg = collected.first().content;
				console.log(msg);
				if (msg === "!y") {
					message.channel.send(`<@!${play1Id}>, do you want to go first or do you want them to go first! (${PREFIX}me/${PREFIX}them)`);
					message.channel.awaitMessages(filterP1, { max: 1, time: 60000, errors: ['Line']})
						.then((collected) => {
							const msg = collected.first().content;
							console.log(msg);
							if (msg === "!me") {
								message.channel.send(`<@!${play1Id}>, nice pick but <@!${play2Id}> are you ok with this? (!y/!n)`);
								message.channel.awaitMessages(filterP2, { max: 1, time: 60000, errors: ['Line']})
									.then((collected) => {
										const msg = collected.first().content;
										console.log(msg);
										if (msg === "!y") {
											message.channel.send(`Nice let the games begin <@!${play1Id}> (going first) v <@!${play2Id}>`);
											//play game
										}else if (msg === "!n") {
											message.channel.send(`<@!${play1Id}>, that is so sad he did not like you going first`);
										}else {
											message.channel.send(`<@!${play1Id}>, I am sorry and dont know what that means so I will count that as declined :(`);
										}
									})
									.catch((err) =>  { 
										console.log(err);
										message.channel.send(`<@!${play2Id}>, you know you do need to respond right?`);
									});
							}else if (msg === "!them") {
								message.channel.send(`<@!${play1Id}>, nice pick but <@!${play2Id}> are you ok with this? (!y/!n)`);
								message.channel.awaitMessages(filterP2, { max: 1, time: 60000, errors: ['Line']})
									.then((collected) => {
										const msg = collected.first().content;
										console.log(msg);
										if (msg === "!y") {
											message.channel.send(`Nice let the games begin <@!${play1Id}> v <@!${play2Id}> (going first)`);
											//play game
										}else if (msg === "!n") {
											message.channel.send(`<@!${play1Id}>, that is so sad he did not like them going first`);
										}else {
											message.channel.send(`<@!${play2Id}>, I am sorry and dont know what that means so I will count that as declined :(`);
										}
									})
									.catch((err) =>  { 
										console.log(err);
										message.channel.send(`<@!${play2Id}>, you know you do need to respond right?`);
									});
							}else {
								message.channel.send(`<@!${play1Id}>, I am sorry and dont know what that means so I will count that as declined :(`);
							}
						})
						.catch((err) =>  { 
							console.log(err);
							message.channel.send(`<@!${play1Id}>, you know you do need to respond right?`);
						});
					}else if (msg === "!n") {
						message.channel.send(`<@!${play1Id}>, sorry but <@!${play2Id}> declined :(`);
					}else {
						message.channel.send(`<@!${play2Id}>, I am sorry and dont know what that means so <@!${play1Id}> I will count that as declined :(`);
					}
					})
					.catch((err) =>  { 
						console.log(err);
						message.channel.send(`<@!${play1Id}>, I feel like <@!${play2Id}> is not here or ignoring you`);
					});
	}
	if (commandName === "help") {
		message.channel.send(`Help \n${PREFIX}play {@ someone} - to play with someone \n${PREFIX}help - to show this`)
	}
})

client.login(process.env.DISCORD_BOT_TOKEN);
