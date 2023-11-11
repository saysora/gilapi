export interface ChatEmbedAuthor {
    name?: string;
    url?: string;
    icon_url?: string;
}
export interface ChatEmbedFooter {
    icon_url?: string;
    text: string;
}
export interface ChatEmbedImage {
    url: string;
}
export interface ChatEmbedField {
    name: string;
    value: string;
    inline?: boolean;
}
export interface ChatEmbed {
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    footer?: ChatEmbedFooter;
    timestamp?: Date;
    thumbnail?: ChatEmbedImage;
    image?: ChatEmbedImage;
    fields?: ChatEmbedField[];
}
