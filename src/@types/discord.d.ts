import '@discordjs/core';
import { APIInteraction, InteractionsAPI } from '@discordjs/core';

declare module "@discordjs/core" {
    interface Interaction extends WithIntrinsicProps<APIInteraction> {
        data: APIInteraction
    }
    
}
