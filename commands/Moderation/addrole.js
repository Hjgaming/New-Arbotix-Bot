const { Message } = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "addrole",
  aliases: ["addrole", "ar"],
  usage: "addrole <role>",
  description: "adds role",
  category: `⛔️ moderation`,
  run: async (client, message, args) => {
        //lets use parameters (optional)
        /*
         * @param {Message} message
         */
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send(`⚠️ You do not have manage roles permission.`)

        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send('❌ No member specified')

        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send('❌ No role specified')
        await target.roles.add(role)
        let Role3 = new MessageEmbed()
        .setColor("#FF0000")
        
        .setDescription(`✅ <@${message.author.id}> added the ${role.name} role to you in ${message.guild.name}`);
        target.send({embeds: [Role3]}) // dm the user about the role got added 
        let Role2 = new MessageEmbed()
        .setColor("#FF0000")
        
        .setDescription(`✅ added the <@&${role.id}> role to ${target.user.tag}**`);
        message.channel.send({embeds: [Role2]}) // added role message

    } 
  }