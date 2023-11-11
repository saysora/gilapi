import { Emote } from "./Emote.js";

export interface MessageReact {
  channelId: string;
  createdBy: string;
  emote: Emote;
  messageId: string;
}

