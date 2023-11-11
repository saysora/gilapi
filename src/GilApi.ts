import fetch from "node-fetch";
import { Channel, CreateMessage, GetServer, Member, Message, UpdateMessage } from "./types/index.js";
const sleep = (ms: number): Promise<any> => new Promise((r: any) => setTimeout(r, ms));

export default class GilAPI {
  token: string;
  headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  constructor(token: string) {
    this.token = token;
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${this.token}`,
    };
  }


  types = {
    channels: "channels",
    messages: "messages",
    servers: "servers",
    members: "members",
    roles: "roles",
    listItem: "items",
  };

  chanTypes = {
    topics: "topics",
  };

  forumTypes = {
    comments: "comments",
    lock: "lock",
  };

  listTypes = {
    items: "items",
  };

  api = "https://www.guilded.gg/api/v1/";

  async GET(path: string, params: any = null): Promise<any> {
    let response: any;

    path = `${this.api}${path}`;

    if (params) {
      path += `?` + new URLSearchParams({ ...params });
    }

    try {
      response = await fetch(`${path}`, {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) {
        throw response;
      }

      const json = await response.json();
      return json;
    } catch (e) {
      response = e;
      const error = await response.text();
      console.log(error);
    }

    if (response.status === 429) {
      const retryTime = parseInt(response.headers["Retry-After"]);
      await sleep(retryTime * 1000);
      return this.GET(path);
    }
  };

  async GETPlus(path: string, params: any): Promise<any> {
    let response: any;
    const theParams = new URLSearchParams(params);
    try {
      response = await fetch(`${this.api}${path}?${theParams.toString()}`, {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) {
        throw response;
      }

      const json = await response.json();
      return json;
    } catch (e) {
      response = e;
      const error = await response.text();
      console.log(error);
    }

    if (response.status === 429) {
      const retryTime = parseInt(response.headers["Retry-After"]);
      await sleep(retryTime * 1000);
      return this.GET(path);
    }
  };

  async POST(path: string, body: any, params: any = null): Promise<any> {
    let response: any;

    path = `${this.api}${path}`;

    if (params) {
      path += `?` + new URLSearchParams({ ...params });
    }

    try {
      response = await fetch(path, {
        method: "POST",
        body: JSON.stringify(body),
        headers: this.headers,
      });

      if (!response.ok) {
        throw response;
      }

      const json = await response.json();
      return json;
    } catch (e) {
      response = e;
      const error = await response.text();
      console.log(error);
    }

    if (response.status === 429) {
      const retryTime = parseInt(response.headers["Retry-After"]);
      await sleep(retryTime * 1000);
      return this.POST(path, body);
    }
  };

  async PUT(path: string, body: any = {}, params: any = null): Promise<any> {
    let response: any;

    path = `${this.api}${path}`;

    if (params) {
      path += `?` + new URLSearchParams({ ...params });
    }

    try {
      response = await fetch(path, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: this.headers,
      });

      if (!response.ok) {
        throw response;
      }

      const json = await response.json();
      return json;
    } catch (e) {
      response = e;
      console.log(e);
      const error = await response.text();
      console.log(error);
    }

    if (response.status === 429) {
      const retryTime = parseInt(response.headers["Retry-After"]);
      await sleep(retryTime * 1000);
      return this.PUT(path, body);
    }
  };

  async PUTBool(path: string, body: any = {}, params: any = null): Promise<any> {
    let response: any;

    path = `${this.api}${path}`;

    if (params) {
      path += `?` + new URLSearchParams({ ...params });
    }

    try {
      response = await fetch(path, {
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
    } catch (e) {
      response = e;
      console.log(e);
      const error = await response.text();
      console.log(error);
    }

    if (response.status === 429) {
      const retryTime = parseInt(response.headers["Retry-After"]);
      await sleep(retryTime * 1000);
      return this.PUT(path, body);
    }
  };

  async DELETE(path: string, params: any = null): Promise<any> {
    let response: any;

    path = `${this.api}${path}`;

    if (params) {
      path += `?` + new URLSearchParams({ ...params });
    }

    try {
      response = await fetch(path, {
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
    } catch (e) {
      response = e;
      const error = await response.text();
      console.log(error);
    }

    if (response.status === 429) {
      const retryTime = parseInt(response.headers["Retry-After"]);
      await sleep(retryTime * 1000);
      return this.DELETE(path);
    }
  };

  /* Webhooks */

  async sendHook(url: string, message: any = {}) {
    return this.POST(url, message);
  };

  /* Message */

  async getMsg(channelId: string, messageId: string): Promise<Message> {
    const { message } = await this.GET(
      `${this.types.channels}/${channelId}/${this.types.messages}/${messageId}`
    );
    return message;
  };

  async getMsgs(channelId: string): Promise<Message[]> {
    const { messages } = await this.GET(
      `${this.types.channels}/${channelId}/${this.types.messages}`
    );

    return messages;
  };

  async sendMsg(channelId: string, newMessage: CreateMessage = {}): Promise<Message> {
    // @ts-ignore
    const { message } = this.POST(`${this.types.channels}/${channelId}/messages`, newMessage);
    return message;
  };

  async delMsg(channelId: string, message: string) {
    return await this.DELETE(
      `${this.types.channels}/${channelId}/messages/${message}`
    );
  };


  async updateMsg(channelId: string, messageId: string, updatedMessage: UpdateMessage = {}): Promise<Message> {
    // @ts-ignore
    const { message } = this.PUT(
      `${this.types.channels}/${channelId}/messages/${messageId}`,
      updatedMessage
    );
    return message;
  };

  /* Reactions */


  async addReaction(channelId: string, messageId: string, reactionId: number) {
    return this.PUTBool(
      `${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes/${reactionId}`
    );
  };

  async removeReaction(channelId: string, messageId: string, reactionId: number, userId: string | null = null) {
    return this.DELETE(
      `${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes/${reactionId}`,
      { userId }
    );
  };

  async removeBotReaction(channelId: string, messageId: string, reactionId: string) {
    return this.DELETE(
      `${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes/${reactionId}`,
      { userId: "@me" }
    );
  };

  async removeAllReactions(channelId: string, messageId: string) {
    return this.DELETE(
      `${this.types.channels}/${channelId}/${this.types.messages}/${messageId}/emotes`
    );
  };

  /* Member */
  async getMember(serverId: string, memberId: string): Promise<Member> {
    const { member } = await this.GET(
      `${this.types.servers}/${serverId}/${this.types.members}/${memberId}`
    );
    return member;
  };

  /* Roles */

  // Legacy
  async addRole(serverId: string, memberId: string, roleId: number) {
    return await this.PUTBool(
      `${this.types.servers}/${serverId}/${this.types.members}/${memberId}/${this.types.roles}/${roleId}`
    );
  };

  addMemberRole = this.addRole;

  async removeRole(serverId: string, memberId: string, roleId: number) {
    return await this.DELETE(
      `${this.types.servers}/${serverId}/${this.types.members}/${memberId}/${this.types.roles}/${roleId}`
    );
  };

  removeMemberRole = this.removeRole;

  /* Lists */

  // Get items
  async getListItems(channelId: string) {
    return await this.GET(`
      ${this.types.channels}/${channelId}/${this.listTypes.items}
      `);
  };

  // Get List Item

  async getListItem(channelId: string, itemId: string) {
    return await this.GET(`
      ${this.types.channels}/${channelId}/${this.listTypes.items}/${itemId}
      `);
  };

  // Add item

  async addListItem(channelId: string, message: string, note: any = {}) {
    return await this.POST(
      `${this.types.channels}/${channelId}/${this.types.listItem}`,
      {
        message,
        note,
      }
    );
  };

  // TODO: Flesh out forum endpoints

  /* Forums */

  // Get Topics

  async getForumPosts(channelId: string, getParams: any) {
    return this.GETPlus(
      `
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}
      `,
      getParams
    );
  };

  // Get Topic

  async getForumPost(channelId: string, topicId: string) {
    return await this.GET(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}
      `);
  };

  // Update forum placeholder

  // Delete forum placeholder

  // TBD Forum Topics

  // Lock Forum Posts

  async lockForumPost(channelId: string, topicId: string) {
    return await this.PUT(
      `
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}/${this.forumTypes.lock}
      `,
      null
    );
  };

  // Get Forum Post Comments

  async getForumPostComments(channelId: string, topicId: string) {
    return await this.GET(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}/${this.forumTypes.comments}
      `);
  };

  // Get Forum Post Comment

  async getForumPostComment(channelId: string, topicId: string, commentId: string) {
    return await this.GET(`
      ${this.types.channels}/${channelId}/${this.chanTypes.topics}/${topicId}/${this.forumTypes.comments}/${commentId}
      `);
  };

  // Update post comment

  // Delete post comment

  // Create topic
  async createForumPost(channelId: string, forumPost = {}) {
    return await this.POST(
      `${this.types.channels}/${channelId}/${this.chanTypes.topics}`,
      forumPost
    );
  };

  /* Channels */

  async getChannel(channelId: string): Promise<Channel> {
    const { channel } = await this.GET(`${this.types.channels}/${channelId}`);

    return channel;
  };

  /* Server */
  async getServer(serverId: string): Promise<GetServer> {
    return await this.GET(`/${this.types.servers}/${serverId}`);
  };

  /* Member Bans */
  // TODO: Refactor code to use id terminology
  async banMember(serverId: string, userId: string, reason?: string) {
    return await this.POST(`/servers/${serverId}/bans/${userId}`, {
      reason,
    });
  };

  async kickMember(serverId: string, userId: string) {
    return await this.DELETE(`/servers/${serverId}/members/${userId}`);
  };

  async setStatus(status: string, emoteId: number) {
    return await this.PUTBool(`/users/@me/status`, {
      content: status,
      emoteId: emoteId,
    });
  };

  async removeStatus() {
    return await this.DELETE(`/users/@me/status`);
  };
}
