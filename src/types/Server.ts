export type ServerType =
  | 'team'
  | 'organization'
  | 'community'
  | 'clan'
  | 'guild'
  | 'friends'
  | 'streaming'
  | 'other';
export interface Server {
  id: string;
  ownerId: string;
  type?: ServerType;
  name: string;
  url?: string;
  about?: string;
  avatar?: string;
  banner?: string;
  timezone?: string;
  isVerified?: boolean;
  defaultChannelId?: string;
  createdAt: Date;
}

export interface GetServer {
  server: Server;
  serverMemberCount: number;
}
