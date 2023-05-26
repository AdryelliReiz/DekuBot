import { APIInteraction, Client, WithIntrinsicProps } from '@discordjs/core';

export const data = {
    id: `Slash-command-avatar`,
    name: "avatar",
    description: "Envia o link do seu avatar!",
    version: "1.0.0",
    options: [{
        name: "id", 
        description: "Id discord do usuário que você deseja obter o avatar",
        type: 3,
        required: true
    }]
};


export async function execute (client: Client, interaction: WithIntrinsicProps<APIInteraction>, data: APIInteraction) {

    try {
        //@ts-ignore
        var args = data.data.options
    
        var argId = args.find(args => args.name.toLowerCase() === "id").value;

        const memberInfo = await client.api.users.get(argId);

        console.log(memberInfo);

        await client.api.interactions.reply(interaction.data.id, interaction.data.token, {
            content: `https://cdn.discordapp.com/avatars/${memberInfo.id}/${memberInfo.avatar}.png`
        });

        
    } catch (error) {
        await client.api.interactions.reply(interaction.data.id, interaction.data.token, {content: "Este membro não existe ou não está no servidor :/"});
    } 

    return;
}