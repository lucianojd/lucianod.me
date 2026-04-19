export interface Server {
  connect(): Promise<void>;
  isConnected(): boolean;
}
