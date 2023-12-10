/// <reference types="node" />
/// <reference types="node" />
import { WebSocket } from 'ws';
import { EventEmitter } from 'events';
export default class GilClient {
    token: string;
    socket: WebSocket | null;
    isAlive: boolean;
    emitter: EventEmitter;
    mCollector: Map<any, any>;
    isReconnecting: boolean;
    reconnectTimer: any;
    reconnectTime: number;
    hbTime: number;
    constructor(token: string);
    on(event: string, data: any): EventEmitter;
    emit(event: string, data: any): boolean;
    connect(): void;
    heartBeatCheck: NodeJS.Timeout;
    reconnect(): void;
    disconnect(): void;
}
