const { EmbedBuilder } = require('discord.js');
const config = require('../../../config.json');

exports.run = async function(client, con, interaction) {
    let user = interaction.options.getUser('user');

    con.query(`SELECT * FROM user_data WHERE discordId = '${user.id}'`, (err, result) => {
        const embed = new EmbedBuilder();
        const embed1 = new EmbedBuilder();
        const embed2 = new EmbedBuilder();
        const embed3 = new EmbedBuilder();
        if (err) {
            embed3.setTitle('Error :x:')
            embed3.setColor("#ED4245")
            embed3.setDescription(`An error occured while trying to pause the user out. Please try again.`)
            interaction.reply({ embeds: [embed3], ephemeral: true });
        } else {
            if (result.length == 0) {
                console.log("User is not whitelisted.")
                embed2.setTitle('Error :x:')
                embed2.setColor("#ED4245")
                embed2.setDescription(`The user is not whitelisted.`)
                interaction.reply({ embeds: [embed2], ephemeral: true });
            } else {
                if (err) return console.log(err);
                con.query(`DELETE FROM user_data WHERE discordId = '${user.id}'`, (err, result) => {
                    if (err) {
                        console.log(err);
                        embed.setTitle('Error :x:')
                        embed.setColor("#ED4245")
                        embed.setDescription(`An error occured while trying to time the user out. Please try again.`)
                    } else {
                        embed.setTitle('Success :white_check_mark:')
                        embed.setColor("#57F287")
                        embed.setDescription(`Successfully removed user from the whitelist`)
                    }
                    interaction.reply({ embeds: [embed], ephemeral: true });
                });
            }
        }
    });
    
};

exports.info = {
    name: 'unwhitelist',
    description: 'Stop a user from accessing the server for a set period of time.',
    options: [
        {
            "name": "user",
            "description": "The user to whitelist.",
            "required": true,
            "type": 6
        }
      ]
}