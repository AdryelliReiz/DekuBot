import { APIInteraction, Client, WithIntrinsicProps } from '@discordjs/core';

export const data = {
    id: `Slash-command-hello`,
    name: "hello",
    description: "Faça o bot falar",
    version: "1.0.0",
    options: [{
        name: "text", 
        description: "texto que vai na mensagem",
        type: 3,
        required: true
    }]
};


export async function execute (client: Client, interaction: WithIntrinsicProps<APIInteraction>, data: APIInteraction) {

    console.log(data)
    /*
    
    var args = i.data.options
    
    var texto = args.find(args => args.name.toLowerCase() === "text").value;
    */
    await client.api.interactions.reply(interaction.data.id, interaction.data.token, {content: "Hello!"});

    return;
}