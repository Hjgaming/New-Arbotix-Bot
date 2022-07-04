const Discord = module.require("discord.js");

module.exports = {
    name: "unlock",
    description: "This unlocks channels",
    category: "⛔️ moderation",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      const GuildMember = message.member;
        if(!GuildMember.permissions.has("MANAGE_CHANNELS")) return message.channel.send({ content: `:crossed_swords: **${message.member.user.username}** You need **MANAGE_CHANNELS** premission`, })

      message.channel.permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: true
});
      const embed = new Discord.MessageEmbed()
      .setTitle("unlocked Channel")
      .setDescription(`${message.channel} has been unlocked`)
      .setColor("#ff0000")
       await message.channel.send({ embeds: [embed] });
      message.delete();
    },
};