import GuildedAPI from './GuildedAPI';
import GilClient from './GilClient';
export type { Server, GetServer, ServerType, Channel, ChannelType, ChannelVisibility, User, UserStatus, Member, ChatEmbed, ChatEmbedField, ChatEmbedImage, ChatEmbedAuthor, ChatEmbedFooter, Message, CreateMessage, UpdateMessage, Emote, MessageReact, } from './types';
export default class Client {
    client: GilClient;
    gilapi: GuildedAPI;
    constructor(token: string);
}
