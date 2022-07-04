const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'ban',
    aliases: ['ban'],
    usage: ["<user>"],
  category: "⛔️ moderation",
    description: "This command ban a  member!",
    emoji: "🔨",
    run: async (client, message, args) => {

        const GuildMember = message.member;
        if(!GuildMember.permissions.has("BAN_MEMBERS")) return message.channel.send({ content: `:crossed_swords: **${message.member.user.username}** You need Ban premission`, })

        const target = message.mentions.users.first();
        if(!target) return message.reply({ content: "Who are trying to ban?" })
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            message.delete();
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("2")
                .setLabel("Approve ban")
                .setStyle("SUCCESS")
                .setEmoji("✅"),
                new MessageButton()
                .setCustomId("1")
                .setEmoji("🚫")
                .setLabel("Dissallow ban")
                .setStyle("DANGER"),
            )
            const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("1")
                .setEmoji("🚫")
                .setLabel("Dissallow ban")
                .setDisabled(true)
                .setStyle("DANGER")
            )

            const filter1 = i => i.customId === "2" && i.user.id;

            const collector = message.channel.createMessageComponentCollector({ filter1 });

            collector.on('collect', async i => {
                if (i.customId === "2") {
                    i.update({ content: "**Member baned**", components: [] })
                    memberTarget.ban();
                }
            })
            const filter2 = b => b.customId === "1" && i.user.id;

            const collectorr = message.channel.createMessageComponentCollector({ filter2 });
            
            collectorr.on('collect', async b => {
                if (b.customId === "1") {
                    b.update({ content: "**Member not baned**", components: [] })
                }
            })
            message.channel.send({ content: "**ban command**", components: [row] })
        }
        }
    }
  