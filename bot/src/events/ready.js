const { readdirSync } = require("fs")
const { join } = require("path")

module.exports = async (client, con, ready) => {
    const commands = readdirSync(join(__dirname, `../`, `commands/slash`));
    for (const command of commands) {
        let cmd = require(`../commands/slash/${command}`);
        if (cmd.info.name) {
            client.application?.commands.create(cmd.info).catch(e => console.log(e));
        } else {
            console.log(`Command ${command} has no name.`);
        }
    }
    
    console.log(`${client.user.tag} is ready!`);
}