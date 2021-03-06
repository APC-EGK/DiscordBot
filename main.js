const Discord= require("discord.js");
const client = new Discord.Client();

const prefix ="-";

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'));

for(const file of commandFiles){
    const command =require(`./commands/${file}`);

    client.commands.set(command.name,command);
}

client.once('ready',() => {
    console.log('UncleRoger is ONLINE!');
});


client.on("message", async message => {
    if(message.content =="$status"){
        message.reply("HAIYA...... what you want? what you want?");
    }
    if(message.content == "$rice"){
        message.reply("only egg fried rice");
    }
    if(!message.content.startsWith(prefix)||message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // let command = client.commands.get(cmd);
    // console.log(command);

    if(command === 'ping'){
        console.log('ping here');
        client.commands.get('ping').execute(message,args);
    }
    if(command === 'meme'){
        console.log('meme here');
        client.commands.get(command).run(client,message, args);
    }
});


client.login(process.env.DISCORD_TOKEN);

const reqHandler = (req, res) => {
   res.writeHead(200);
   res.end("Why hello");
};

const server = require("http").createServer(reqHandler);

server.listen(process.env.PORT);