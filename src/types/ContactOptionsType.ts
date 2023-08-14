type linkType = {
    value: String;
    clicksCounter: Number;
};

export type ContactOptionsType = {
    facebook: linkType | null;
    instagram: linkType | null;
    tiktok: linkType | null;
    whatsapp: linkType | null;
    phone: linkType | null;
    email: linkType | null;
    twitter: linkType | null;
    linkedin: linkType | null;
    youtube: linkType | null;
}