const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    description: 'userinfo command',

    /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

    run: async(client, interaction, args) => {
        var permissions = [];
        var acknowledgements = 'None';

        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        const user = interaction.author;

        if(member.permissions.has("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.permissions.has("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.permissions.has("ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(member.permissions.has("MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(member.permissions.has("MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(member.permissions.has("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.permissions.has("MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(member.permissions.has("MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(member.permissions.has("MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        
    
        if(permissions.length == 0){
            permissions.push("No Key Permissions Found");
        }
    
        if(member.user.id == interaction.guild.fetchOwner().id){
            acknowledgements = 'Server Owner';
        }
    
        const embed = new MessageEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('#2F3136')
            .setFooter(`User Info`, interaction.client.user.avatarURL({ dynamic: true }))
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField('__User:__ ', `<@${member.user.id}>`, true)
            .addField('__User ID:__ ', `${member.user.id}`, true)
            .addField('__Joined at:__ ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
            .addField('__Created On:__', member.user.createdAt.toLocaleString(), true)
            .addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== interaction.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== interaction.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`)
            .addField("\n__Acknowledgements:__ ", `${acknowledgements}`)
            .addField("\n__Permissions:__ ", `${permissions.join(` **|** `)}`, true);

        interaction.editReply({ embeds: [ embed ] });
    },
  }