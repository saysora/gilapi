import { Emote } from "./Emote";

export interface MessageReact {
  channelId: string;
  createdBy: string;
  emote: Emote;
  messageId: string;
}

