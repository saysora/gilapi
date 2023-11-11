export interface Mention {
  users?: {
    id: string;
  }[];
  channels?: {
    id: string;
  }[];
  roles?:{
    id: number;
  }[];
  everyone?: boolean;
  here?: boolean;
}
