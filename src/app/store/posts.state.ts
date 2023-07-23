import { Post } from '../models/post';

export interface PostsState {
  loading: boolean;
  posts: Post[];
  post: Post | null;
  error: any;
}
