const rrModel = require('../../models/reactionRoles')
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')


module.exports = {
  name: "panel",
  description: "reaction role panel",
  userPermissions: ['MANAGE_ROLES'],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const guildData = await rrModel.findOne({ 
      guildId: interaction.guildId
    });

    if (!guildData?.roles)
    return interaction.followUp(
      "There is no roles inside of this server!"
    );

    const options = guildData.roles.map(x => {
      const role = interaction.guild.roles.cache.get(x.roleId);

      return {
        label: role.name,
        value: role.id,
        description: x.roleDescription || 'NO description',
        emoji: x.roleEmoji
      };
    });
              //YOU CAN EDIT THIS EMBED IF YOU WANT
    const panelEmbed = new MessageEmbed()
      .setTitle('__**Reaction Roles**__')
      .setThumbnail("https://cdn.discordapp.com/attachments/916543771657797664/991322886184898560/dc1936a1f9b1a7b23330a44b15e925a1.png")
      .setColor('#FF0000')
      .setDescription('**Please select a role below**\nThese roles will give you access to the server and announcement pings')
      .setImage("https://media.discordapp.net/attachments/947417823557349377/991320735400345661/standard_1.gif")
      .setFooter("ARBOTIX DEVLOPMENT | HJGAMING")
      .setTimestamp()

    const components = [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
           .setCustomId('reaction-roles') //<== DO NOT REMOVE THIS
           .setMaxValues(1)
           .addOptions(options)
      )
    ];

    interaction.followUp({ embeds: [ panelEmbed], components })

  }
};