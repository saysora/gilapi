import { User } from "./User";
export interface Member {
    user: User;
    roleIds: number[];
    nickname?: string;
    joinedAt: Date;
    isOwner?: boolean;
}
