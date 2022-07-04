const client = require("../index");
const { Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu, CommandInteraction } = require('discord.js')
const { owners } = require("../settings/embed.json");
const ec = require("../settings/embed.json");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction, message, async) {


    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slash.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id
        );

/// owner only handler
      if (cmd) {
      if (cmd.ownerOnly) {
      if (!owners.includes(interaction.user.id)) {
      let ownerOnly = new MessageEmbed()
        .setTitle("__**Owner Only**__")
        .setAuthor({ name: ec.guildName, iconURL: ec.iconURL })
        .setThumbnail(ec.iconURL)
        .setColor(ec.color)
        
        .setFooter({ text: ec.footer, iconURL: ec.iconURL})
        .setDescription("Only Bot Developer can use this command!")
        .setTimestamp()
        return interaction.followUp({embeds : [ownerOnly] })
     }}
    }
      
     // userPermission Handler
        if(!interaction.member.permissions.has(cmd.userPermissions || [])) 
        return interaction.followUp({ 
          embeds: [
            new MessageEmbed()
            .setTitle("__**WARNING PERMISSIONS**__")
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: ec.iconURL })
            .setThumbnail(ec.iconURL)
            .setColor(ec.color)
            
            .setDescription(`You do not have **${cmd.userPermissions}** to run this command`)
            .setFooter({ text: ec.footer, iconURL: ec.iconURL})
            .setTimestamp()
          ]
        });

        cmd.run(client, interaction, args);
    }

    //////////////////////////////////////////
    /////////////CONTEXT HANDLER//////////////
    //////////////////////////////////////////
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    //////////////////////////////////////////
    /////////REACTION ROLE HANDLER////////////
    //////////////////////////////////////////
    //Reaction Roles Handling
    if(interaction.isSelectMenu()) {
      if(interaction.customId !== 'reaction-roles') return;
      await interaction.deferReply({ ephermal: true })
      const wait = require('util').promisify(setTimeout)
      const roleId = interaction.values[0];
      const role = interaction.guild.roles.cache.get(roleId)
      const memberRoles = interaction.member.roles;
      
      const hasRole = memberRoles.cache.has(roleId);

      if(hasRole) {
        memberRoles.remove(roleId);
       await  interaction.followUp(`✅ ${role.name} has been removed from user`)
       await wait(2000)
       await interaction.deleteReply()
      } else {
        memberRoles.add(roleId)
        await interaction.followUp(`✅ Role has been added to the user`)
        await wait(2000)
        await interaction.deleteReply()
      }
    }
}
                                           }