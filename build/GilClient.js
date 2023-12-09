"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const events_1 = require("events");
const WS_ENDPOINT = "wss://www.guilded.gg/websocket/v1";
class GilClient {
    constructor(token) {
        this.isAlive = false;
        this.emitter = new events_1.EventEmitter();
        this.mCollector = new Map();
        this.isReconnecting = false;
        this.reconnectTimer = null;
        this.reconnectTime = 10000;
        this.hbTime = 30000;
        this.heartBeatCheck = setInterval(() => {
            if (this.isAlive === false)
                return this.reconnect();
            this.isAlive = false;
            if (this.socket) {
                this.socket.ping();
            }
        }, this.hbTime);
        this.token = token;
        this.connect();
    }
    on(event, data) {
        return this.emitter.on(event, data);
    }
    emit(event, data) {
        return this.emitter.emit(event, data);
    }
    connect() {
        // Ensure we are not in the reconnecting loop
        clearTimeout(this.reconnectTimer);
        this.isReconnecting = false;
        this.socket = new ws_1.WebSocket(WS_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        this.socket.on("open", () => {
            this.emitter.emit("open");
            this.isAlive = true;
        });
        this.socket.on("message", (data) => {
            const { op, t: eventType, d: payload } = JSON.parse(data.toString());
            if (op == 1) {
                this.hbTime = payload.heartbeatIntervalMs;
            }
            this.emitter.emit(eventType, payload);
        });
        this.socket.on("error", (err) => {
            // Allow client to register to errors
            this.emitter.emit('error', err);
        });
        this.socket.on("close", (data) => {
            this.emitter.emit("close", JSON.parse(data.toString()));
        });
        this.socket.on("pong", () => {
            this.isAlive = true;
        });
    }
    reconnect() {
        if (this.isReconnecting) {
            return;
        }
        this.isReconnecting = true;
        console.log("Attempting to reconnect in 10 seconds...");
        this.disconnect();
        this.reconnectTimer = setTimeout(() => {
            this.connect();
        }, this.reconnectTime);
    }
    disconnect() {
        clearInterval(this.heartBeatCheck);
        if (this.socket) {
            this.socket.terminate();
        }
    }
}
exports.default = GilClient;
//# sourceMappingURL=GilClient.js.map