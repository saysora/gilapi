import GuildedAPI from './GuildedAPI';
import GilClient from './GilClient';

export type {
  // Server
  Server,
  GetServer,
  ServerType,
  // Channel
  Channel,
  ChannelType,
  ChannelVisibility,
  // User + Member
  User,
  UserStatus,
  Member,
  // Embed
  ChatEmbed,
  ChatEmbedField,
  ChatEmbedImage,
  ChatEmbedAuthor,
  ChatEmbedFooter,
  // Message
  Message,
  CreateMessage,
  UpdateMessage,
  // Emote
  Emote,
  // Reaction
  MessageReact,
} from './types';

export class Client {
  client: GilClient;
  gilapi: GuildedAPI;

  constructor(token: string) {
    this.client = new GilClient(token);
    this.gilapi = new GuildedAPI(token);

    return {
      client: this.client,
      gilapi: this.gilapi,
    };
  }
}
