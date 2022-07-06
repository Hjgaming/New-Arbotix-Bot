const { MessageEmbed, Formatters } = require("discord.js");
const { default: fetch } = require("node-fetch");

const statuses = {
  online: "🟢 Online",
  offline: "🔘 Offline",
  dnd: "🔴 DND",
  idle: "🟡 Idle",
};

const flags = {
  DISCORD_EMPLOYEE: "<:employee:974687934252982342>",
  DISCORD_PARTNER: "<:partneredserverowner:974686102004834354>",
  BUGHUNTER_LEVEL_1: "<:bughunter:974686102638178365>",
  BUGHUNTER_LEVEL_2: "<:bughunter2:974686101669310516>",
  HYPESQUAD_EVENTS: "<:hypesquadevents:974686101975482448>",
  HOUSE_BRAVERY: "Hyper Bravery",
  HOUSE_BRILLIANCE: "Hyper Brillance",
  HOUSE_BALANCE: "Hyper Balance",
  EARLY_SUPPORTER: "<:earlysupporter:974686101853851769>",
  SYSTEM: "<:developer:974687011040526376>",
  VERIFIED_BOT:
    "<:verifiedbot1:974687683299393586><:verifiedbot2:974687670729072640>",
  VERIFIED_DEVELOPER: "<:developer:974687011040526376>",
  NITRO: "<:nitroclassic:974686101799329832>",
  BOOSTER_1: "<:serverbooster1:974686102000640060>",
  BOOSTER_2: "<:serverbooster2:974686102042574929>",
  BOOSTER_3: "<:serverbooster3:974686102071951390>",
  BOOSTER_4: "<:serverbooster4:974686102017425428>",
  BOOSTER_5: "<:serverbooster5:974686102126485554>",
  BOOSTER_6: "<:serverbooster6:974686102046797854>",
  BOOSTER_7: "<:serverbooster7:974686102063566898>",
  BOOSTER_8: "<:serverbooster8:974686101946138674>",
  BOOSTER_9: "<:serverbooster9:974686101933539358>",
};

module.exports = {
  name: "userinfo",
  description: "Get a users information.",
  category: "🤖 Information Commands",
  aliases: ["userinfo", "whois", "user", "ui"],
  examples: ["<@user / id>"],
  
  run: async (client, message, args) => {
    const user =
      message.mentions.users.last() ||
      client.users.cache.get(args[0]) ||
      message.author;

    const member = await message.guild.members.fetch(user.id);

    const roles = member.roles.cache
      .filter((x) => x.id !== message.guild.id && !x.managed)
      .sort((a, b) => b.position - a.position)
      .map((x) => x.toString());

    const response = await fetch(
      `https://japi.rest/discord/v1/user/${user.id}`
    );
    const data = await response.json(); //public_flags_array

    const joinedAt = Formatters.time(member.joinedAt, "R");
    const createdAt = Formatters.time(user.createdAt, "R");

    let status = member.presence?.status;

    if (status === "dnd" || status === "idle" || status === "online")
      status = statuses[status];
    else if (
      status === "invisible" ||
      status === "offline" ||
      status === undefined
    )
      status = statuses["offline"];

    const badges = data.data.public_flags_array
      ? data.data.public_flags_array.map((flag) => flags[flag]).join(" ")
      : "No Badges.";

    try {
      const embed = new MessageEmbed()
        .setTitle("User Information")
        .setColor("#FF0000")
        .addFields([
          {
            name: "__User__",
            value: `
          **Username:** ${user.username}
          **Tag:** ${user.tag}
          **Discriminator:** ${user.discriminator}
          **ID:** ${user.id}
          **Bot:** ${user.bot ? "Yes" : "No"}
          **System:** ${user.system ? "Yes" : "No"}
          **Created At:** ${createdAt}
          **Avatar:** [Link Here](${member.displayAvatarURL({ dynamic: true })})
          **Activivty:** ${
            member.presence?.activities[0]
              ? member.presence?.activities[0].name
              : "No Current Activity."
          }
          **Badges:** ${badges}
          `,
          },
          {
            name: "__User Bio__",
            value: `${data.data.bio || "```No Bio Set.```"}`,
          },
          {
            name: "__Server Member__",
            value: `
          **Display Name:** ${member.displayName}
          **Joined At:** ${joinedAt}
          **Highest Role:** ${
            member.roles.highest.id === message.guild.id
              ? "No Highest Role."
              : member.roles.highest
          }
          **Hoist Role:** ${
            member.roles.hoist ? member.roles.hoist : "No Hoist Role."
          }
          **Roles [${roles.length}]:** ${
              roles.length < 10
                ? roles.join(" ")
                : roles.length > 10
                ? trimArray(roles)
                : "No Roles."
            }
          `,
          },
        ])
        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `Requested By: ${message.author.tag}` });
      message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (error) {
      console.log(error);
      message.reply({
        content: `An error occured while running this command: \`\`\`${error}\`\`\``,
      });
    }
  }
}

function trimArray(arr, maxLen = 10) {
  if (arr.length > maxLen) {
    const len = arr.length - maxLen;
    arr = arr.slice(0, maxLen);
    arr.push(`${len} more...`);
  }
  return arr;
}
