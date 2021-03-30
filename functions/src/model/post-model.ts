type stateTypes = 'PENDING_REVIEW' | 'PUBLISHED' | 'DRAFT';

export interface PostModel {
  id: string;
  authorId: string;
  categoryId?: string;
  created?: number | Date | FBDateModel;
  updated?: number | Date | FBDateModel;
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

export interface ResponsePostsModel {
  id: string;
  author: string;
  created: FBDateModel;
  title: string;
  summary: string;
  url: string;
}

export interface FBDateModel {
  _seconds: number;
  _nanoseconds: number;
}
