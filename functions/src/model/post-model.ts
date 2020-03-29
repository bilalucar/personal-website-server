import { ResponseUserInfoModel } from './user-model';

type stateTypes = 'PENDING_REVIEW' | 'PUBLISHED' | 'DRAFT';

export interface PostModel {
    id: string;
    authorId: string;
    categoryId?: string;
    created?: number | Date;
    updated?: number | Date;
    state: stateTypes;
    featuredImage: string;
    title: string;
    summary: string;
    content: string;
    url: string;
    htmlTitle: string;
    metaDescription: string;
    tags: string[];
}

export interface ResponsePostModel {
    id: string;
    authorInfo: ResponseUserInfoModel;
    categoryId?: string;
    created?: number | Date;
    featuredImage: string;
    title: string;
    summary: string;
    content: string;
    url: string;
    htmlTitle: string;
    metaDescription: string;
    tags: string[];
}
