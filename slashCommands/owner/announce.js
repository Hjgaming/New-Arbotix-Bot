const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "announce",
  description: "📋 Announce something through the bot!",
  userPermission: "ADMINISTRATOR",
  options: [
      {
        name: 'title',
        type: 'STRING',
        description: 'Put your announcement title here!',
        required: true,
      },
      {
        name: 'message',
        type: 'STRING',
        description: 'Display your message you\'d like to announce!',
        required: true,
      },
      {
        name: 'color',
        type: 'STRING',
        description: 'Customize your embed color.',
        required: false,
      },
      {
        name: 'footer',
        type: 'STRING',
        description: 'Add a footer to your announcement.',
        required: false,
      },
      { 
        name: 'timestamp', 
        description: 'Enable timestamp?', 
        type: 'BOOLEAN',
        required: false,
      },
      {
        name: 'ping',
        description: 'An additional ping to your announcement message.',
        type: 'STRING',
        required: false,
        choices: [
                { name: "@everyone", value: "@everyone" },
                { name: "@here", value: "@here" }
            ]
      }
  ],
  /**
    *
    * @param {CommandInteraction} interaction
    */
  run: async(client, interaction, args) => {
    if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.editReply({content:'Perms Denied'})
    
    const { options, user } = interaction;
    const title = options.getString("title");
    const message = options.getString("message");
    const color = options.getString("color");
    const footer = options.getString("footer");
    const timestamp = options.getBoolean("timestamp");
    const ping = options.getString("ping");
    const embed = new MessageEmbed()
    .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL({dynamic: true})}`})
    .setTitle(`${title}`)
    .setDescription(`${message}`)

    if(color) embed.setColor(color.toUpperCase());
    if(footer) embed.setFooter({ text: footer });
    if(timestamp) embed.setTimestamp();

    if (!ping) {
      interaction.followUp({
        embeds: [embed]
      });
    } else {
      interaction.followUp({
        content: `${ping === "@everyone" ? "@everyone" : "@here"}`,
        embeds: [embed],
        allowedMentions: {
          parse: ['everyone']
        }
      });
    }
  }
}