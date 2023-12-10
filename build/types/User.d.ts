export type UserType = 'bot' | 'user';
export interface UserStatus {
    content?: string;
    emoteId: number;
}
export interface User {
    id: string;
    type: UserType;
    name: string;
    avatar?: string;
    banner?: string;
    createdAt: Date;
    status?: UserStatus;
}
