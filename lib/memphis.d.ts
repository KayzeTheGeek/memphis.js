interface IRetentionTypes {
    MAX_MESSAGE_AGE_SECONDS: string;
    MESSAGES: string;
    BYTES: string;
}
interface IStorageTypes {
    FILE: string;
    MEMORY: string;
}
export declare class Memphis {
    private isConnectionActive;
    connectionId: string;
    host: string;
    port: number;
    username: string;
    private connectionToken;
    private reconnect;
    private maxReconnect;
    private reconnectIntervalMs;
    private timeoutMs;
    brokerConnection: any;
    brokerManager: any;
    brokerStats: any;
    retentionTypes: IRetentionTypes;
    storageTypes: IStorageTypes;
    JSONC: any;
    constructor();
    connect({ host, port, username, connectionToken, reconnect, maxReconnect, reconnectIntervalMs, timeoutMs }: {
        host: string;
        port?: number;
        username: string;
        connectionToken: string;
        reconnect?: boolean;
        maxReconnect?: number;
        reconnectIntervalMs?: number;
        timeoutMs?: number;
    }): Promise<Memphis>;
    private _normalizeHost;
    private _generateConnectionID;
    station({ name, retentionType, retentionValue, storageType, replicas, dedupEnabled, dedupWindowMs }: {
        name: string;
        retentionType?: string;
        retentionValue?: number;
        storageType?: string;
        replicas?: number;
        dedupEnabled?: boolean;
        dedupWindowMs?: number;
    }): Promise<Station>;
    producer({ stationName, producerName }: {
        stationName: string;
        producerName: string;
    }): Promise<Producer>;
    consumer({ stationName, consumerName, consumerGroup, pullIntervalMs, batchSize, batchMaxTimeToWaitMs, maxAckTimeMs, maxMsgDeliveries }: {
        stationName: string;
        consumerName: string;
        consumerGroup: string;
        pullIntervalMs?: number;
        batchSize?: number;
        batchMaxTimeToWaitMs?: number;
        maxAckTimeMs?: number;
        maxMsgDeliveries?: number;
    }): Promise<Consumer>;
    close(): void;
}
declare class Producer {
    private connection;
    private producerName;
    private stationName;
    constructor(connection: Memphis, producerName: string, stationName: string);
    produce({ message, ackWaitSec }: {
        message: Uint8Array;
        ackWaitSec?: number;
    }): Promise<void>;
    destroy(): Promise<void>;
}
declare class Consumer {
    private connection;
    private stationName;
    private consumerName;
    private consumerGroup;
    private pullIntervalMs;
    private batchSize;
    private batchMaxTimeToWaitMs;
    private maxAckTimeMs;
    private maxMsgDeliveries;
    private eventEmitter;
    private pullInterval;
    private pingConsumerInvtervalMs;
    private pingConsumerInvterval;
    constructor(connection: Memphis, stationName: string, consumerName: string, consumerGroup: string, pullIntervalMs: number, batchSize: number, batchMaxTimeToWaitMs: number, maxAckTimeMs: number, maxMsgDeliveries: number);
    on(event: String, cb: (...args: any[]) => void): void;
    private _handleAsyncIterableSubscriber;
    private _pingConsumer;
    destroy(): Promise<void>;
}
declare class Station {
    private connection;
    private name;
    constructor(connection: Memphis, name: string);
    destroy(): Promise<void>;
}
declare const MemphisInstance: Memphis;
export default MemphisInstance;
