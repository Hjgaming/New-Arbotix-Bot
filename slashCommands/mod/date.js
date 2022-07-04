const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "date",
    description: "today date",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
		const pEmbed = new MessageEmbed()
			.setColor('BLUE')
			.addField('Today is', `${moment(Date.now()).format('dddd, MMMM Do YYYY,')}`);
		interaction.followUp({ embeds: [pEmbed]});
	},
};