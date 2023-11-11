var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export default class GilAPI {
    constructor(token) {
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        this.types = {
            channels: "channels",
            messages: "messages",
            servers: "servers",
            members: "members",
            roles: "roles",
            listItem: "items",
        };
        this.chanTypes = {
            topics: "topics",
        };
        this.forumTypes = {
            comments: "comments",
            lock: "lock",
        };
        this.listTypes = {
            items: "items",
        };
        this.api = "https://www.guilded.gg/api/v1/";
        this.addMemberRole = this.addRole;
        this.removeMemberRole = this.removeRole;
        this.token = token;
        this.headers = Object.assign(Object.assign({}, this.headers), { Authorization: `Bearer ${this.token}` });
    }
    GET(path, params = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            path = `${this.api}${path}`;
            if (params) {
                path += `?` + new URLSearchParams(Object.assign({}, params));
            }
            try {
                response = yield fetch(`${path}`, {
                    method: "GET",
                    headers: this.headers,
                });
                if (!response.ok) {
                    throw response;
                }
                const json = yield response.json();
                return json;
            }
            catch (e) {
                response = e;
                const error = yield response.text();
                console.log(error);
            }
            if (response.status === 429) {
                const retryTime = parseInt(response.headers["Retry-After"]);
                yield sleep(retryTime * 1000);
                return this.GET(path);
            }
        });
    }
    ;
    GETPlus(path, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            const theParams = new URLSearchParams(params);
            try {
                response = yield fetch(`${this.api}${path}?${theParams.toString()}`, {
                    method: "GET",
                    headers: this.headers,
                });
                if (!response.ok) {
                    throw response;
                }
                const json = yield response.json();
                return json;
            }
            catch (e) {
                response = e;
                const error = yield response.text();
                console.log(error);
            }
            if (response.status === 429) {
                const retryTime = parseInt(response.headers["Retry-After"]);
                yield sleep(retryTime * 1000);
                return this.GET(path);
            }
        });
    }
    ;
    POST(path, body, params = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            path = `${this.api}${path}`;
            if (params) {
                path += `?` + new URLSearchParams(Object.assign({}, params));
            }
            try {
                response = yield fetch(path, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: this.headers,
                });
                if (!response.ok) {
                    throw response;
                }
                const json = yield response.json();
                return json;
            }
            catch (e) {
                response = e;
                const error = yield response.text();
                console.log(error);
            }
            if (response.status === 429) {
                const retryTime = parseInt(response.headers["Retry-After"]);
                yield sleep(retryTime * 1000);
                return this.POST(path, body);
            }
        });
    }
    ;
    PUT(path, body = {}, params = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            path = `${this.api}${path}`;
            if (params) {
                path += `?` + new URLSearchParams(Object.assign({}, params));
            }
            try {
                response = yield fetch(path, {
                    method: "PUT",
                    body: JSON.stringify(body),
                    headers: this.headers,
                });
                if (!response.ok) {
                    throw response;
                }
                const json = yield response.json();
                return json;
            }
            catch (e) {
                response = e;
                console.log(e);
                const error = yield response.text();
                console.log(error);
            }
            if (response.status === 429) {
                const retryTime = parseInt(response.headers["Retry-After"]);
                yield sleep(retryTime * 1000);
                return this.PUT(path, body);
            }
        });
    }
    ;
    PUTBool(path, body = {}, params = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            path = `${this.api}${path}`;
            if (params) {
                path += `?` + new URLSearchParams(Object.assign({}, params));
            }
            try {
                response = yield fetch(path, {
                    method: "PUT",
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
                const error = yield response.text();
                console.log(error);
            }
            if (response.status === 429) {
                const retryTime = parseInt(response.headers["Retry-After"]);
                yield sleep(retryTime * 1000);
                return this.PUT(path, body);
            }
        });
    }
    ;
    DELETE(path, params = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            path = `${this.api}${path}`;
            if (params) {
                path += `?` + new URLSearchParams(Object.assign({}, params));
            }
            try {
                response = yield fetch(path, {
                    method: "DELETE",
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
                const error = yield response.text();
                console.log(error);
            }
            if (response.status === 429) {
                const retryTime = parseInt(response.headers["Retry-After"]);
                yield sleep(retryTime * 1000);
                return this.DELETE(path);
            }
        });
    }
    ;
    sendHook(url, message = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.POST(url, message);
        });
    }
    ;
    getMsg(channelId, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message } = yield this.GET(`${this.types.channels}/${channelId}/${this.types.messages}/${messageId}`);
            return message;
        });
    }
    ;
    getMsgs(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { messages } = yield this.GET(`${this.types.channels}/${channelId}/${this.types.messages}`);
            return messages;
        });
    }
    ;
    sendMsg(channelId, newMessage = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message } = this.POST(`${this.types.channels}/${channelId}/messages`, newMessage);
            return message;
        });
    }
    ;
    delMsg(channelId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.DELETE(`${this.types.channels}/${channelId}/messages/${message}`);
        });
    }
    ;
    updateMsg(channelId, messageId, updatedMessage = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message } = this.PUT(`${this.types.channels}/${channelId}/messages/${messageId}`, updatedMessage);
            return message;
        });
    }
    ;
    addReaction(channelId, messageId, reactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.PUTBool(`${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes/${reactionId}`);
        });
    }
    ;
    removeReaction(channelId, messageId, reactionId, userId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.DELETE(`${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes/${reactionId}`, { userId });
        });
    }
    ;
    removeBotReaction(channelId, messageId, reactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.DELETE(`${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes/${reactionId}`, { userId: "@me" });
        });
    }
    ;
    removeAllReactions(channelId, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.DELETE(`${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes`);
        });
    }
    ;
    getMember(serverId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { member } = yield this.GET(`${this.types.servers}/${serverId}/${this.types.members}/${memberId}`);
            return member;
        });
    }
    ;
    addRole(serverId, memberId, roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.PUTBool(`${this.types.servers}/${serverId}/${this.types.members}/${memberId}/${this.types.roles}/${roleId}`);
        });
    }
    ;
    removeRole(serverId, memberId, roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.DELETE(`${this.types.servers}/${serverId}/${this.types.members}/${memberId}/${this.types.roles}/${roleId}`);
        });
    }
    ;
    getListItems(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GET(`
      ${this.types.channels}/${channelId}/${this.listTypes.items}
      `);
        });
    }
    ;
    getListItem(channelId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GET(`
      ${this.types.channels}/${channelId}/${this.listTypes.items}/${itemId}
      `);
        });
    }
    ;
    addListItem(channelId, message, note = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.POST(`${this.types.channels}/${channelId}/${this.types.listItem}`, {
                message,
                note,
            });
        });
    }
    ;
    getForumPosts(channelId, getParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.GETPlus(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}
      `, getParams);
        });
    }
    ;
    getForumPost(channelId, topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GET(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}
      `);
        });
    }
    ;
    lockForumPost(channelId, topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.PUT(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}/${this.forumTypes.lock}
      `, null);
        });
    }
    ;
    getForumPostComments(channelId, topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GET(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}/${this.forumTypes.comments}
      `);
        });
    }
    ;
    getForumPostComment(channelId, topicId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GET(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}/${this.forumTypes.comments}/${commentId}
      `);
        });
    }
    ;
    createForumPost(channelId, forumPost = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.POST(`${this.types.channels}/${channelId}/${this.chanTypes.topics}`, forumPost);
        });
    }
    ;
    getChannel(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { channel } = yield this.GET(`${this.types.channels}/${channelId}`);
            return channel;
        });
    }
    ;
    getServer(serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GET(`/${this.types.servers}/${serverId}`);
        });
    }
    ;
    banMember(serverId, userId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.POST(`/servers/${serverId}/bans/${userId}`, {
                reason,
            });
        });
    }
    ;
    kickMember(serverId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.DELETE(`/servers/${serverId}/members/${userId}`);
        });
    }
    ;
    setStatus(status, emoteId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.PUTBool(`/users/@me/status`, {
                content: status,
                emoteId: emoteId,
            });
        });
    }
    ;
    removeStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.DELETE(`/users/@me/status`);
        });
    }
    ;
}
//# sourceMappingURL=GilApi.js.map