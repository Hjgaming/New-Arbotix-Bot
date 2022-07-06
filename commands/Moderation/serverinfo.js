const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    aliases: [],
    description: 'retrieves data about the server.',
    emoji: "🧏",
  category: "🤖 Information Commands",
    run: async (client, message, args) => {

        // Get guild from message
        const { guild } = message;

        // Owner Variables
        const owner = await guild.fetchOwner();
        const serverOwner = client.users.cache.get(owner.id);

        // Categories Variables
        const categories = await guild.channels.cache.filter((channel) => channel.type === "GUILD_CATEGORY").size;
        const textChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").size;
        const voiceChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_VOICE").size;
        const newsChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_NEWS").size;
        const stageChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_STAGE_VOICE").size;
        const totalChannels = categories + textChannels + voiceChannels + newsChannels + stageChannels;

        // Members Variables
        const totalMembers = await guild.memberCount;
        const humanMembers = await guild.members.cache.filter((m) => !m.user.bot).size;
        const botMembers = await guild.members.cache.filter((m) => m.user.bot).size;

        // Emojis Variables
        const totalEmojis = await guild.emojis.cache.size;
        const normalEmojis = await guild.emojis.cache.filter((e) => !e.animated).size;
        const animatedEmojis = await guild.emojis.cache.filter((e) => e.animated).size;

        // Boost Variables
        const boostLevel = await guild.premiumTier ? guild.premiumTier : "0";
        const totalBoosts = await guild.premiumSubscriptionCount || "0";

        // Create embed
        const embed = new MessageEmbed()
            .setTitle("__**Server Information**__")
            .setColor("#ff0000")
            .addFields(
                { name: `**Server Name:**`, value: `\`\`\`${guild.name}\`\`\``, inline: true },
                { name: `**Server Owner:**`, value: `\`\`\`${serverOwner.tag}\`\`\``, inline: true },
                { name: `**Server Members [ ${totalMembers} ]:**`, value: `\`\`\`Members: ${humanMembers} | Bots: ${botMembers}\`\`\``, inline: false },
                { name: `**Server ID:**`, value: `\`\`\`${guild.id}\`\`\``, inline: true },
                { name: `**Server Emojis [ ${totalEmojis} ]:**`, value: `\`\`\`Normal: ${normalEmojis} | Animated: ${animatedEmojis}\`\`\``, inline: false },
                { name: `**Server Categories and Channels [ ${totalChannels} ]:**`, value: `\`\`\`Categories: ${categories} | Text: ${textChannels} | Voice: ${voiceChannels} | Announcement: ${newsChannels} | Stage: ${stageChannels}\`\`\``, inline: false },
                { name: `**Server Boost Level:**`, value: `\`\`\`${boostLevel}\`\`\``.replace("NONE", "0"), inline: true },
                { name: `**Server Boosts Amount:**`, value: `\`\`\`${totalBoosts}\`\`\``, inline: true },
                { name: `**Creation Date:**`, value: `\`\`\`${moment(guild.createdTimestamp).format("LT")} ${moment(guild.createdTimestamp).format("LL")} (${moment(guild.createdTimestamp).fromNow()})\`\`\``, inline: false },
            );

        // Send embed
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
};
