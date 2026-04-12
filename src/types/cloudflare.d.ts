export interface CloudFlareVerificationResponse {
  action: string;
  cdata: string;
  challenge_ts: string;
  hostname: string;
  metadata: {
    interactive: boolean;
  };
  success: boolean;
}
