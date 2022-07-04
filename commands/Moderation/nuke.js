const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "nuke",
  aliases: ["bomb"],
  categories: "⛔️ moderation",
  UserPerms: ["ADMINISTRATOR"],
  description: "Nuke channel your channel",
  cooldown: 5,
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

		const GuildMember = message.member;
        if(!GuildMember.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: `:crossed_swords: **${message.member.user.username}** You need **ADMINISTRATOR** premission`, })
    
    let nukeButton = new MessageActionRow().addComponents(
      new MessageButton().setCustomId("YES").setStyle("SUCCESS").setLabel("Yes"),

      new MessageButton().setCustomId("NO").setStyle("DANGER").setLabel("No")
    );

    message.reply({
      content: "**Are you sure you want to nuke this channel?**",
      components: [nukeButton],
    });
    const filter = (interaction) => {
      if (interaction.user.id === message.author.id) return true;
      return interaction.reply({
        content: "Only owner can use this command",
        ephemeral: true,
      });
    };

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: 1,
    });

    collector.on("collect", (buttonInteraction) => {
      const id = buttonInteraction.customId;

      if (id === "YES") {
        message.channel.clone().then((ch) => {
          let reason = args.join(" ") || "No Reason";
          let embed = new MessageEmbed().setTitle("**Channel Succesfuly Nuked**").setColor("#FF0000").setDescription(reason).setImage("https://media0.giphy.com/media/oe33xf3B50fsc/200.gif");
          ch.setParent(message.channel.parent);
          ch.setPosition(message.channel.position);
          message.channel.delete().then(() => {
            ch.send({ embeds: [embed] }).then((msg) => {
              setTimeout(() => msg.delete(), 5000);
            });
          });
        });
      }
      if (id === "NO") {
        return message.channel.bulkDelete("1", true).then(message.react("👍"));
      }
    });
  },
};