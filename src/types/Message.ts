import { ChatEmbed } from "./ChatEmbed";
import { Mention } from "./Mention";

export type MessageType = "default" | "system";

export interface Message {
  id: string;
  type: MessageType;
  serverId: string;
  groupId: string;
  channelId: string;
  content?: string;
  hiddenLinkPreviewUrls?: string[];
  embeds?: ChatEmbed[];
  replyMessageIds?: string[];
  isPrivate?: boolean;
  isSilent?: boolean;
  isPinned?: boolean;
  mentions?: Mention;
  createdAt: Date;
  createdBy: string;
  createdByWebhookId?: string;
  updatedAt?: Date;
}

export interface CreateMessage {
  isPrivate?: boolean;
  isSilent?: boolean;
  replyMessageIds?: string[];
  content?: string;
  hiddenLinkPreviewUrls?: string[]
  embeds?: ChatEmbed[]
}

export interface UpdateMessage {
  content?: string;
  hiddenLinkPreviewUrls?: string[];
  embeds?: ChatEmbed[];
}
