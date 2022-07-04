const Discord = require("discord.js");
const ms = require('ms')

module.exports = {
        name: "timeout",
        description: "Timeout a member in the discord!",   
        userPermissions: ['MODERATE_MEMBERS'],
        options: [{
            type: 'SUB_COMMAND',
            name: "on",
            description: "Timeout a certain user",
            options: [{
                name: 'user',
                description: 'User to Mute/Timeout',
                type: 'USER',
                required: true,
            },
             {
                name: "time",
                description: "The Time for the User to be Timed Out",
                type: 'STRING',
                required: true,
             },
            { 
                name: 'reason',
                description: 'Reason to mute the user',
                type: 'STRING',
                required: false
            }],
        },
        {
            type: 'SUB_COMMAND',
            name: "off",
            description: "Remove the timeout of a certain user",
            options: [{
                name: 'target',
                description: 'User to Mute/Timeout',
                type: 'USER',
                required: true,
            },
            { 
                name: 'purpose',
                description: 'Reason to mute the user',
                type: 'STRING',
                required: false
            }],
        },],
run: async (client, interaction, args) => {
try {
const [ SubCmd ] = args;
if (SubCmd === 'off') {
            let member  = interaction.options.getMember('target');
            const reason = interaction.options.getString('reason') || "No reason provided";
            const content = interaction.options.getString('time') 

if(!interaction.member.permissions.has('MODERATE_MEMBERS')) return interaction.editReply({content:'Perms Denied'})
  
            if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp('You cannot timeout this user because they are higher than you.')
            if (member.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp(`User's role position is higher than mine.`)
                     member.timeout(null, reason);
                     interaction.followUp(`Removed timeout for ${member.user.tag}`)
    }
if (SubCmd === 'on') {
            let ggg = ['d', "m", "h", "s"];
            let member  = interaction.options.getMember('user');
            const reason = interaction.options.getString('reason') || "No reason provided";
            const ey = interaction.options.getString('time') 
            if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp('You cannot timeout this user because they are higher than you.')
            if (member.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp(`User's role position is higher than mine.`)
                const timee = ms(ey)
                if (timee <= 9999) return interaction.followUp('You cannot timeout someone for less than 10 seconds.')
                if (timee > 2332800000) return interaction.followUp('You cannot timeout for more than 27 days.')
                member.timeout(timee, reason);
                    const embsend = new Discord.MessageEmbed()
                    .setTitle(`Set timeout`)
                    .setDescription(`**User:** ${member.user.tag}\n**By:** ${interaction.user.tag}\n**Time:** ${ms(timee)}`)
                    .setColor(client.config.Color)
                    .setFooter(interaction.user.username, interaction.user.displayAvatarURL())
                    interaction.followUp({ embeds: [embsend]});
                  
           }
         } catch(e){
           console.log(e)
           interaction.channel.send(`${e}`)
       }
    },
}; 
