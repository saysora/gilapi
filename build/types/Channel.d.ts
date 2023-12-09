export type ChannelType = "announcements" | "chat" | "calendar" | "forums" | "media" | "docs" | "voice" | "list" | "scheduling" | "stream";
export type ChannelVisibility = "private" | "public";
export interface Channel {
    id: string;
    type: ChannelType;
    name: string;
    topic?: string;
    createdAt: Date;
    createdBy: string;
    updatedAt?: Date;
    serverId: string;
    rootId?: string;
    parentId?: string;
    messageId?: string;
    categoryId?: number;
    groupId: string;
    visibility?: ChannelVisibility;
    archivedBy?: string;
    archivedAt?: Date;
}
