const Discord = require('discord.js');

module.exports = {
	name: 'nick',
	cooldown: 10000,
	aliases: ['setnick', 'setnickname', 'nickname'],
	category: "⛔️ moderation",
	description: 'Change nickname of anyone',
	run: async (client, message, args) => {
		const GuildMember = message.member;
        if(!GuildMember.permissions.has("MANAGE_NICKNAMES")) return message.channel.send({ content: `:crossed_swords: **${message.member.user.username}** You need **MANAGE_NICKNAMES** premission`, })

		if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
			let cembed = new Discord.MessageEmbed()
				.setDescription("I don't have enough powers")
				.setColor('RED');
			return message.channel.send({ embeds: [cembed]});
		}

		let user =
			message.mentions.users.first() ||
			message.guild.members.cache.get()||
			message.author;

		if (!user) {
			let eembed = new Discord.MessageEmbed()
				.setDescription('You need to mention the user first')
				.setColor('RED');
			return message.channel.send({ embeds: [eembed]});
		}

		let nick = args.slice(1).join(' ');

		if (!nick) {
			let membed = new Discord.MessageEmbed()
				.setDescription('Please give the nick you want to have')
				.setColor('RED');
			return message.channel.send({ embeds: [membed]});
		}

		let member = message.guild.members.cache.get(user.id);

		let embed = new Discord.MessageEmbed()
			.setDescription(
				`Successfully changed **${user.tag}** nickname to **${nick}**`
			)
			.setColor('GREEN');
		message.channel.send({ embeds: [embed]});

		await member
			.setNickname(nick)
			.catch(err =>
				message.channel.send(`${err}`)
				)
			;
	}
};
