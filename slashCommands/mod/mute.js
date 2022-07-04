 const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute Someone",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "Select a User To Mute",
      type: 6,
      required: true,
    },
    {
      name: "time",
      description: "Time Till Mute in Minutes",
      type: 4,
      required: false,
    },
    {
      name: "reason",
      description: "Reason To Mute",
      type: 3,
      required: false,
    },
  ],
  userPermissions: ["MANAGE_ROLES"],
  botPerms: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (client, interaction) => {
    try {
      const options = interaction.options._hoistedOptions;

      const user = options.find((e) => e.name === "user");
      const time = options.find((e) => e.name === "time");
      const reason = options.find((e) => e.name === "reason")?.value || `Muted by ${interaction.member.displayName}`;

      const embed = new MessageEmbed().setColor("GREEN");

      let MutedRole = interaction.guild.roles.cache.find((r) => r.name === "Muted");

      if (!MutedRole) {
        const role = await interaction.guild.roles.create({ name: "Muted" });

        interaction.guild.channels.cache.map((x) => {
          if (!x.isThread()) {
            x.permissionOverwrites.edit(
              role,
              {
                MANAGE_WEBHOOKS: false,
                SEND_MESSAGES: false,
                USE_PUBLIC_THREADS: false,
                USE_PRIVATE_THREADS: false,
                ADD_REACTIONS: false,
                ATTACH_FILES: false,
                SEND_TTS_MESSAGES: false,
                MANAGE_THREADS: false,
                MANAGE_MESSAGES: false,
                MENTION_EVERYONE: false,
                CONNECT: false,
                SPEAK: false,
              },
              reason,
            );
          }

          MutedRole = role;
        });
      }

      if (user.member.roles.cache.find((e) => e.name === "Muted")) {
        embed.setColor("RED").setDescription(`:x: User Already Muted`);
        return await interaction.reply({ embeds: [embed] });
      }

      await user.member.roles.add(MutedRole);
      embed.setDescription(`:white_check_mark: ${user.member.toString()} ***Muted Successfully***`);
      interaction.followUp({ embeds: [embed] });

      // for timed mute
      if (time) {
        setTimeout(async () => {
          await user.member.roles.remove(MutedRole);
        }, time.value * 60 * 1000);
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  },
};