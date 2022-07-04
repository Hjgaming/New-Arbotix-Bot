const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "ctopic",
  description: "Update the channel topic",
  category: "⛔️ moderation",
  usage:"ctopic #channel [topic]",
  run: async (bot, message, args) => {
        const GuildMember = message.member;
        if(!GuildMember.permissions.has("MANAGE_CHANNELS")) return message.channel.send({ content: `:crossed_swords: **${message.member.user.username}** You need **MANAGE_CHANNELS** premission`, });

    let channel = message.mentions.channels.first();
    let topic;
    if (!channel) {
      channel = message.channel;
      topic = args.join(" ");
    } else {
      topic = args.slice(1).join(" ").trim();
    }

    if (!topic) return message.reply("Please provide a new topic");

        if(!GuildMember.permissions.has("MANAGE_CHANNELS")) return message.channel.send({ content: `:crossed_swords: **${message.member.user.username}** You need **MANAGE_CHANNELS** premission`, });

    await channel.setTopic(topic);
    await message.channel.send(
      `✅ Successfully updated channel topic to ${topic}`
    );
  },
};