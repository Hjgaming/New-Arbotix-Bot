const discord = require('discord.js');

module.exports = {
    name: "mc",
    description: "member count",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
		let embed = new discord.MessageEmbed()
			.setDescription(
				`
Total Members - ${interaction.guild.memberCount}
Humans - ${interaction.guild.members.cache.filter(m => !m.user.bot).size}
Bots - ${interaction.guild.members.cache.filter(m => m.user.bot).size}`
			)
			.setColor('RANDOM')
			.setTimestamp((interaction.timestamp = Date.now()));

		interaction.followUp({ embeds: [embed]});
	}
};
