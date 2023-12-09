import { Channel, CreateMessage, GetServer, Member, Message, UpdateMessage } from "./types/";
export default class GilAPI {
    token: string;
    headers: any;
    constructor(token: string);
    types: {
        channels: string;
        messages: string;
        servers: string;
        members: string;
        roles: string;
        listItem: string;
    };
    chanTypes: {
        topics: string;
    };
    forumTypes: {
        comments: string;
        lock: string;
    };
    listTypes: {
        items: string;
    };
    api: string;
    GET(path: string, params?: any): Promise<any>;
    GETPlus(path: string, params: any): Promise<any>;
    POST(path: string, body: any, params?: any): Promise<any>;
    PUT(path: string, body?: any, params?: any): Promise<any>;
    PUTBool(path: string, body?: any, params?: any): Promise<any>;
    DELETE(path: string, params?: any): Promise<any>;
    sendHook(url: string, message?: any): Promise<any>;
    getMsg(channelId: string, messageId: string): Promise<Message>;
    getMsgs(channelId: string): Promise<Message[]>;
    sendMsg(channelId: string, newMessage?: CreateMessage): Promise<Message>;
    delMsg(channelId: string, message: string): Promise<any>;
    updateMsg(channelId: string, messageId: string, updatedMessage?: UpdateMessage): Promise<Message>;
    addReaction(channelId: string, messageId: string, reactionId: number): Promise<any>;
    removeReaction(channelId: string, messageId: string, reactionId: number, userId?: string | null): Promise<any>;
    removeBotReaction(channelId: string, messageId: string, reactionId: string): Promise<any>;
    removeAllReactions(channelId: string, messageId: string): Promise<any>;
    getMember(serverId: string, memberId: string): Promise<Member>;
    addRole(serverId: string, memberId: string, roleId: number): Promise<any>;
    addMemberRole: (serverId: string, memberId: string, roleId: number) => Promise<any>;
    removeRole(serverId: string, memberId: string, roleId: number): Promise<any>;
    removeMemberRole: (serverId: string, memberId: string, roleId: number) => Promise<any>;
    getListItems(channelId: string): Promise<any>;
    getListItem(channelId: string, itemId: string): Promise<any>;
    addListItem(channelId: string, message: string, note?: any): Promise<any>;
    getForumPosts(channelId: string, getParams: any): Promise<any>;
    getForumPost(channelId: string, topicId: string): Promise<any>;
    lockForumPost(channelId: string, topicId: string): Promise<any>;
    getForumPostComments(channelId: string, topicId: string): Promise<any>;
    getForumPostComment(channelId: string, topicId: string, commentId: string): Promise<any>;
    createForumPost(channelId: string, forumPost?: {}): Promise<any>;
    getChannel(channelId: string): Promise<Channel>;
    getServer(serverId: string): Promise<GetServer>;
    banMember(serverId: string, userId: string, reason?: string): Promise<any>;
    kickMember(serverId: string, userId: string): Promise<any>;
    setStatus(status: string, emoteId: number): Promise<any>;
    removeStatus(): Promise<any>;
}
