import { ChatEmbed } from "./ChatEmbed.js";
import { Mention } from "./Mention.js";
export type MessageType = "default" | "system";
export interface Message {
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
    hiddenLinkPreviewUrls?: string[];
    embeds?: ChatEmbed[];
}
export interface UpdateMessage {
    content?: string;
    hiddenLinkPreviewUrls?: string[];
    embeds?: ChatEmbed[];
}
