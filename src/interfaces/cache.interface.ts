export interface Cache {
  isConnected(): boolean;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  get<E>(key: string): Promise<E | null>;
  set<E>(key: string, value: E, ttl?: number): Promise<void>;
  refresh(key: string, ttl?: number): Promise<void>;
}
