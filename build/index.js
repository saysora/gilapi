"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GilApi_1 = require("./GilApi");
const GilClient_1 = require("./GilClient");
class Client {
    constructor(token) {
        this.client = new GilClient_1.default(token);
        this.gilapi = new GilApi_1.default(token);
        return {
            client: this.client,
            gilapi: this.gilapi
        };
    }
}
exports.default = Client;
//# sourceMappingURL=index.js.map