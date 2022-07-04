const { MessageEmbed, MessageActionRow, MessageButton, message } = require("discord.js");

module.exports = {
    name: "help",
    category: "🤖 Information Commands",
    aliases: [ "h" ],
    description: "Return all commands, or one specific command",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   run: async (client, message, args) => {

  const embed = new MessageEmbed()
    .setTitle(`Arbotix Help`)
    .addField("**__My Features__**",
`>>> **__Help Menu__**, 
🏠 ... Overview



🔰 ... Information
🎊 ... Fun Related
⛔ ... Moderation Related
💬 ... Suggestion Related`)

    .addField('__SLASH HELP__','TRY NEW SLASHCOMMANDS WITH ARBOTIX BOT TYPE **/help** FOR SHOW ALL SLASHCOMMANDS', true)
        
      .addField(`**__Bot Creator Information__**`,`>>> 💯 This Bot has been made by:\n[**HJ GAMING**](https://discord.com/users/589154804601716838)・[**Discord**](https://discord.gg/7wmb5x7qp4)・[**Click here**](https://discord.gg/7wmb5x7qp4)`)
    
    .setColor(client.embedColor)
    .setTimestamp()
                
    let but1 = new MessageButton().setCustomId("home").setLabel("🏠").setStyle("SUCCESS")
  
    let but2 = new MessageButton().setCustomId("music").setLabel("🎊").setStyle("PRIMARY")
  
    let but3 = new MessageButton().setCustomId("info").setLabel("🔰").setStyle("PRIMARY");
    
    let but4 = new MessageButton().setCustomId("playlist").setLabel("⛔").setStyle("PRIMARY");

    let but5 = new MessageButton().setCustomId("config").setLabel("💬").setStyle("PRIMARY");

     let _commands;
     let editEmbed = new MessageEmbed();
     
    const m = await message.reply({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4, but5)] });

    const collector = m.createMessageComponentCollector({
      filter: (b) => {
      if(b.user.id === message.author.id) return true;
       else {
     b.reply({ ephemeral: true, content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`}); return false;
           };
      },
      time : 60000,
      idle: 60000/2
    });
    collector.on("end", async () => {
		 if(!m) return;
        await m.edit({ components: [new MessageActionRow().addComponents(but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true),  but5.setDisabled(true))] }).catch(() => {});
    });
    collector.on('collect', async (b) => {
       if(!b.deferred) await b.deferUpdate()
        if(b.customId === "home") {
           if(!m) return;
           return await m.edit({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4,  but5)] })
        }
        if(b.customId === "music") {
         _commands = client.commands.filter((x) => x.category && x.category === "Fun").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Fun Commands").setFooter({text: `Total ${_commands.length} Fun commands.`});
           if(!m) return;
           return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4,  but5)] })
        }
         if(b.customId == "info") {
         _commands = client.commands.filter((x) => x.category && x.category === "🤖 Information Commands").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Information Commands").setFooter({text: `Total ${_commands.length} Information commands.`})
          return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4, but5)] })
         }
         if(b.customId == "playlist") {
          _commands = client.commands.filter((x) => x.category && x.category === "⛔️ moderation").map((x) => `\`${x.name}\``);
              editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Moderation Commands").setFooter({text: `Total ${_commands.length} moderation commands.`})
           return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4, but5)] })
          }
         if(b.customId == "config") {
         _commands = client.commands.filter((x) => x.category && x.category === "suggestion").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("suggestion Commands").setFooter({text: `Total ${_commands.length} suggestion commands.`})
          return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4, but5)] })
         
        }
     });
   }
 }