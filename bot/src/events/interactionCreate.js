const { InteractionType } = require("discord.js");

module.exports = async function(client, con, interaction) {
    try {
        let c = interaction.commandName;
        if (interaction.type === InteractionType.ApplicationCommand) {
            let m = [];
            if(interaction.options._hoistedOptions.length != 0) {
                await interaction.options._hoistedOptions.forEach(async o => {
                    m.push(`\`[${o.type}]\` **${o.name.toUpperCase()}:** ${o.value}`)
                });
            };
            require(`../commands/slash/${c}.js`).run(client, con, interaction);
        }
    } catch (e) {
        console.log(e);
    }
}