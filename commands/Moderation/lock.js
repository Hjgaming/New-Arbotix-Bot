const Discord = module.require("discord.js");

module.exports = {
    name: "lock",
    description: "This locks channels",
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
        SEND_MESSAGES: false
});
      const embed = new Discord.MessageEmbed()
      .setTitle("Locked Channel")
      .setDescription(`${message.channel} has been locked`)
      .setColor("#ff0000")
       await message.channel.send({ embeds: [embed] });
      message.delete();
    },
};