const Discord = require("discord.js");


module.exports = {
  name: "unban",
  category: "⛔️ moderation",
  description: "Unbans a member",
  usage: "unban <Id>",
  run: async (client, message, args) => {
    if (message.author.bot) return;

    const err = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("UNBAN")
      .setDescription(
        `Arbotix ~ you don't have permission to unban members. (**BAN_MEMBERS**)`
      )
      .setTimestamp()
      .setFooter("Requested by " + message.member.user.tag);

    if (!message.member.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS))
      return message.channel.send({ embeds: [err] }).then((msg) => {
        setTimeout(() => msg.delete(), 15000);
      });

    let userID = args[0];

    const invalidmember = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("UNBAN")
      .setDescription(
        `Arbotix ~ you need to mention a valid member of this server.`
      )
      .setTimestamp()
      .setFooter("Requested by " + message.member.user.tag);

    if (!userID)
      return message.channel.send({ embeds: [invalidmember] }).then((msg) => {
        setTimeout(() => msg.delete(), 15000);
      });

    message.guild.bans.fetch().then((bans) => {
      if (bans.size == 0) return;
      let bUser = bans.find((b) => b.user.id == userID);
      if (!bUser) return;
      message.guild.members.unban(bUser.user);
    });

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided";

    const success = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Successfully unbanned!")
      .setDescription(
        "Arbotix ~ I've successfully unbanned Id `" +
          userID +
          "`" +
          " with the reason: ```" +
          reason +
          "```"
      )
      .setTimestamp()
      .setFooter("Requested by " + message.member.user.tag);
    message.channel.send({ embeds: [success] })
        }
}