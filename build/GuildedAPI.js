"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const G_API = 'https://www.guilded.gg/api/v1/';
class GuildedAPI {
    constructor(token) {
        this.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        this.types = {
            channels: 'channels',
            messages: 'messages',
            servers: 'servers',
            members: 'members',
            roles: 'roles',
            listItem: 'items',
        };
        this.chanTypes = {
            topics: 'topics',
        };
        this.forumTypes = {
            comments: 'comments',
            lock: 'lock',
        };
        this.listTypes = {
            items: 'items',
        };
        this.api = G_API;
        this.addMemberRole = this.addRole;
        this.removeMemberRole = this.removeRole;
        this.token = token;
        this.headers = {
            ...this.headers,
            Authorization: `Bearer ${this.token}`,
        };
    }
    async GET(path, params = null) {
        let response;
        path = `${this.api}${path}`;
        if (params) {
            path += '?' + new URLSearchParams({ ...params });
        }
        try {
            response = await (0, node_fetch_1.default)(`${path}`, {
                method: 'GET',
                headers: this.headers,
            });
            if (!response.ok) {
                throw response;
            }
            const json = await response.json();
            return json;
        }
        catch (e) {
            response = e;
            const error = await response.text();
            console.log(error);
        }
        if (response.status === 429) {
            const retryTime = parseInt(response.headers['Retry-After']);
            await sleep(retryTime * 1000);
            return this.GET(path);
        }
    }
    async GETPlus(path, params) {
        let response;
        const theParams = new URLSearchParams(params);
        try {
            response = await (0, node_fetch_1.default)(`${this.api}${path}?${theParams.toString()}`, {
                method: 'GET',
                headers: this.headers,
            });
            if (!response.ok) {
                throw response;
            }
            const json = await response.json();
            return json;
        }
        catch (e) {
            response = e;
            const error = await response.text();
            console.log(error);
        }
        if (response.status === 429) {
            const retryTime = parseInt(response.headers['Retry-After']);
            await sleep(retryTime * 1000);
            return this.GET(path);
        }
    }
    async POST(path, body, params = null) {
        let response;
        path = `${this.api}${path}`;
        if (params) {
            path += '?' + new URLSearchParams({ ...params });
        }
        try {
            response = await (0, node_fetch_1.default)(path, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: this.headers,
            });
            if (!response.ok) {
                throw response;
            }
            const json = await response.json();
            return json;
        }
        catch (e) {
            response = e;
            const error = await response.text();
            console.log(error);
        }
        if (response.status === 429) {
            const retryTime = parseInt(response.headers['Retry-After']);
            await sleep(retryTime * 1000);
            return this.POST(path, body);
        }
    }
    async PUT(path, body = {}, params = null) {
        let response;
        path = `${this.api}${path}`;
        if (params) {
            path += '?' + new URLSearchParams({ ...params });
        }
        try {
            response = await (0, node_fetch_1.default)(path, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: this.headers,
            });
            if (!response.ok) {
                throw response;
            }
            const json = await response.json();
            return json;
        }
        catch (e) {
            response = e;
            console.log(e);
            const error = await response.text();
            console.log(error);
        }
        if (response.status === 429) {
            const retryTime = parseInt(response.headers['Retry-After']);
            await sleep(retryTime * 1000);
            return this.PUT(path, body);
        }
    }
    async PUTBool(path, body = {}, params = null) {
        let response;
        path = `${this.api}${path}`;
        if (params) {
            path += '?' + new URLSearchParams({ ...params });
        }
        try {
            response = await (0, node_fetch_1.default)(path, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: this.headers,
            });
            if (!response.ok) {
                throw response;
            }
            return {
                status: response.status,
                statusText: response.statusText,
            };
        }
        catch (e) {
            response = e;
            console.log(e);
            const error = await response.text();
            console.log(error);
        }
        if (response.status === 429) {
            const retryTime = parseInt(response.headers['Retry-After']);
            await sleep(retryTime * 1000);
            return this.PUT(path, body);
        }
    }
    async DELETE(path, params = null) {
        let response;
        path = `${this.api}${path}`;
        if (params) {
            path += '?' + new URLSearchParams({ ...params });
        }
        try {
            response = await (0, node_fetch_1.default)(path, {
                method: 'DELETE',
                headers: this.headers,
            });
            if (!response.ok) {
                throw response;
            }
            return {
                status: response.status,
                statusText: response.statusText,
            };
        }
        catch (e) {
            response = e;
            const error = await response.text();
            console.log(error);
        }
        if (response.status === 429) {
            const retryTime = parseInt(response.headers['Retry-After']);
            await sleep(retryTime * 1000);
            return this.DELETE(path);
        }
    }
    /* Webhooks */
    async sendHook(url, message = {}) {
        return this.POST(url, message);
    }
    /* Message */
    async getMsg(channelId, messageId) {
        const { message } = await this.GET(`${this.types.channels}/${channelId}/${this.types.messages}/${messageId}`);
        return message;
    }
    async getMsgs(channelId) {
        const { messages } = await this.GET(`${this.types.channels}/${channelId}/${this.types.messages}`);
        return messages;
    }
    async sendMsg(channelId, newMessage = {}) {
        // @ts-ignore
        const { message } = this.POST(`${this.types.channels}/${channelId}/messages`, newMessage);
        return message;
    }
    async delMsg(channelId, message) {
        return await this.DELETE(`${this.types.channels}/${channelId}/messages/${message}`);
    }
    async updateMsg(channelId, messageId, updatedMessage = {}) {
        // @ts-ignore
        const { message } = this.PUT(`${this.types.channels}/${channelId}/messages/${messageId}`, updatedMessage);
        return message;
    }
    /* Reactions */
    async addReaction(channelId, messageId, reactionId) {
        return this.PUTBool(`${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes/${reactionId}`);
    }
    async removeReaction(channelId, messageId, reactionId, userId = null) {
        return this.DELETE(`${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes/${reactionId}`, { userId });
    }
    async removeBotReaction(channelId, messageId, reactionId) {
        return this.DELETE(`${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes/${reactionId}`, { userId: '@me' });
    }
    async removeAllReactions(channelId, messageId) {
        return this.DELETE(`${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes`);
    }
    /* Member */
    async getMember(serverId, memberId) {
        const { member } = await this.GET(`${this.types.servers}/${serverId}/${this.types.members}/${memberId}`);
        return member;
    }
    /* Roles */
    // Legacy
    async addRole(serverId, memberId, roleId) {
        return await this.PUTBool(`${this.types.servers}/${serverId}/${this.types.members}/${memberId}/${this.types.roles}/${roleId}`);
    }
    async removeRole(serverId, memberId, roleId) {
        return await this.DELETE(`${this.types.servers}/${serverId}/${this.types.members}/${memberId}/${this.types.roles}/${roleId}`);
    }
    /* Lists */
    // Get items
    async getListItems(channelId) {
        return await this.GET(`
      ${this.types.channels}/${channelId}/${this.listTypes.items}
      `);
    }
    // Get List Item
    async getListItem(channelId, itemId) {
        return await this.GET(`
      ${this.types.channels}/${channelId}/${this.listTypes.items}/${itemId}
      `);
    }
    // Add item
    async addListItem(channelId, message, note = {}) {
        return await this.POST(`${this.types.channels}/${channelId}/${this.types.listItem}`, {
            message,
            note,
        });
    }
    // TODO: Flesh out forum endpoints
    /* Forums */
    // Get Topics
    async getForumPosts(channelId, getParams) {
        return this.GETPlus(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}
      `, getParams);
    }
    // Get Topic
    async getForumPost(channelId, topicId) {
        return await this.GET(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}
      `);
    }
    // Update forum placeholder
    // Delete forum placeholder
    // TBD Forum Topics
    // Lock Forum Posts
    async lockForumPost(channelId, topicId) {
        return await this.PUT(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}/${this.forumTypes.lock}
      `, null);
    }
    // Get Forum Post Comments
    async getForumPostComments(channelId, topicId) {
        return await this.GET(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}/${this.forumTypes.comments}
      `);
    }
    // Get Forum Post Comment
    async getForumPostComment(channelId, topicId, commentId) {
        return await this.GET(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}/${this.forumTypes.comments}/${commentId}
      `);
    }
    // Update post comment
    // Delete post comment
    // Create topic
    async createForumPost(channelId, forumPost = {}) {
        return await this.POST(`${this.types.channels}/${channelId}/${this.chanTypes.topics}`, forumPost);
    }
    /* Channels */
    async getChannel(channelId) {
        const { channel } = await this.GET(`${this.types.channels}/${channelId}`);
        return channel;
    }
    /* Server */
    async getServer(serverId) {
        return await this.GET(`/${this.types.servers}/${serverId}`);
    }
    /* Member Bans */
    // TODO: Refactor code to use id terminology
    async banMember(serverId, userId, reason) {
        return await this.POST(`/servers/${serverId}/bans/${userId}`, {
            reason,
        });
    }
    async kickMember(serverId, userId) {
        return await this.DELETE(`/servers/${serverId}/members/${userId}`);
    }
    async setStatus(status, emoteId) {
        return await this.PUTBool('/users/@me/status', {
            content: status,
            emoteId: emoteId,
        });
    }
    async removeStatus() {
        return await this.DELETE('/users/@me/status');
    }
}
exports.default = GuildedAPI;
//# sourceMappingURL=GuildedAPI.js.map