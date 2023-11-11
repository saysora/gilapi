/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { WebSocket } from "ws";
import { EventEmitter } from "events";
export default class GilClient {
    token: string;
    socket: WebSocket | null;
    isAlive: boolean;
    emitter: EventEmitter;
    mCollector: Map<any, any>;
    reconnectTimer: any;
    hbTime: number;
    constructor(token: string);
    on(event: string, data: any): EventEmitter;
    emit(event: string, data: any): boolean;
    connect(): void;
    heartBeatCheck: NodeJS.Timeout;
    stopReconnect(): void;
    reconnect(): void;
    disconnect(): void;
}
