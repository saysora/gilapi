import { WebSocket } from "ws";
import { EventEmitter } from "events";

export default class GilClient {

  token: string;
  // @ts-ignore
  socket: WebSocket | null;
  isAlive = false;

  emitter = new EventEmitter();
  mCollector = new Map();

  reconnectTimer: any = null;

  hbTime = 30000;

  constructor(token: string) {
    this.token = token;
    this.connect();
  }

  on(event: string, data: any) {
    return this.emitter.on(event, data);
  }

  emit(event: string, data: any) {
    return this.emitter.emit(event, data);
  }

  connect() {
    this.stopReconnect();
    this.socket = new WebSocket("wss://www.guilded.gg/websocket/v1", {
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

    this.socket.on("error", () => {
      this.reconnect();
    });

    this.socket.on("close", (data) => {
      this.emitter.emit("close", JSON.parse(data.toString()));
    });

    this.socket.on("pong", () => {
      this.isAlive = true;
    });
  }

  heartBeatCheck = setInterval(() => {
    if (this.isAlive === false) return this.reconnect();
    this.isAlive = false;
    if(this.socket) {
      this.socket.ping();
    }
  }, this.hbTime);

  stopReconnect() {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
    }
  }

  reconnect() {
    clearInterval(this.heartBeatCheck);
    console.log("Attempting to reconnect in 10 seconds...");
    this.disconnect();

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, 10000);
  }

  disconnect() {
    if(this.socket) {
      this.socket.terminate();
    }
  }
}
