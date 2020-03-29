export interface UserInfoModel {
    id: string;
    username: string;
    name: string;
    surname: string;
    fullName: string;
    email: string;
    bio?: string;
    avatar: string;
    created: Date;
    updated?: Date;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    roles: string[];
}

export interface ResponseUserInfoModel {
    username: string;
    name: string;
    surname: string;
    fullName: string;
    email: string;
    bio?: string;
    avatar: string;
    created: Date;
    updated?: Date;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    website?: string;
}
