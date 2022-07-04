const rrModel = require('../../models/reactionRoles')
const { Client, CommandInteraction } = require('discord.js')

module.exports = {
  name: "panel-removerole",
  description: "reaction role panel",
  userPermissions: ['MANAGE_ROLES'],
    options: [
    {
      name: "role",
      description: "role to be Removed",
      type: "ROLE",
      required: true
    },
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const role = interaction.options.getRole("role");

    const guildData = await rrModel.findOne({ guildId: interaction.guildId});
    if (!guildData) 
    return interaction.followUp(
      "There is no roles inside of this server!"
    );

    const guildRoles = guildData.roles;

    const findRole = guildRoles.find(x => x.roleId === role.id)
    if(!findRole) return interaction.followUp("That role is not added to the reaction roles list")

    const filteredRoles = guildRoles.filter(x=> x.roleId !== role.id)
    guildData.roles = filteredRoles;

    await guildData.save()

    interaction.followUp(`✅ Removed: ${role.name}`)
  }
};