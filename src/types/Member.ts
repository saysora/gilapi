import { User } from "./User.js";

export interface Member {
  user: User,
  roleIds: number[];
  nickname?: string;
  joinedAt: Date;
  isOwner?: boolean;
}
