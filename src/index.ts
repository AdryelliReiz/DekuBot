import fs from "fs";
import botConfigs from './configs/botConfigs.json';
import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import { GatewayDispatchEvents, GatewayIntentBits, Client } from '@discordjs/core';

// Cria uma REST e WebSocket para o bot
const rest = new REST({ version: '10' }).setToken(botConfigs.token);
const ws = new WebSocketManager({
	token: botConfigs.token,
	intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
	rest,
});

// Cria um cliente para ouvir eventos
const client = new Client({ rest, ws });

const slash = [];

//busca na pasta de comandos os arquivos de slash commands
const arquivos = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".ts"));

for(const files of arquivos) {

	import(`./commands/${files}`).then(async (file) => {
		slash.push(file);
	
		//Registra os comandos
		await client.api.applicationCommands.createGlobalCommand(botConfigs.id, file.data, file)
		.then(() => {
			console.log(`Comando - ${file.data.name} - foi registrado!`)
		})

	});
}

//Ouvindo eventos de interação do user com o bot
client.on(GatewayDispatchEvents.InteractionCreate, (interaction) => {
	//@ts-ignore
	const command = slash.find(cmd => cmd.data.name === interaction.data.data.name)
   
	if(command) command.execute(client, interaction, interaction.data);
});

// Ouve os evento de inicialização do bot
client.once(GatewayDispatchEvents.Ready, async() => {
	//Lista quantos comandos o bot tem
	await client.api.applicationCommands.getGlobalCommands(botConfigs.id)
	.then((cmd) => console.log(`Há ${cmd.length} comando(s) registrado(s)!`))
	console.log('Ready!')
})

// Inicia uma conexão websocket
ws.connect();