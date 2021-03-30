import { UserService } from './user-service';
import { FirebaseAdmin } from '../config/firebase-admin';
import { PostModel, ResponsePostsModel } from '../model/post-model';

export class PostService {
  private readonly admin = FirebaseAdmin.firebaseAdmin;

  public async getPosts() {
    const posts: ResponsePostsModel[] = [];

    const userService = new UserService();

    const users = await userService.getUsers();

    const getAuthorInfo = (authorId: string) => {
      const { fullName } = users.find((user) => user.id === authorId)!;

      return { fullName };
    };

    await this.admin
      .firestore()
      .collection('posts')
      .get()
      .then(async (querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          const post: PostModel = doc.data();

          if (post.state !== 'PUBLISHED') {
            return;
          }

          const { id, title, created, summary, url } = post;

          posts.push(<ResponsePostsModel>{
            id,
            title,
            created,
            summary,
            url,
            author: getAuthorInfo(post.authorId)?.fullName,
          });
        });
      });

    return posts.sort((a, b) => b?.created?._seconds - a?.created?._seconds);
  }

  public async getPostsPath() {
    const paths: string[] = [];

    await this.admin
      .firestore()
      .collection('posts')
      .get()
      .then(async (querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          const post: PostModel = doc.data();

          if (post.state !== 'PUBLISHED') {
            return;
          }

          paths.push(post.url);
        });
      });

    return paths;
  }

  public async getPost(slug: string) {
    if (!slug) {
      return {};
    }

    const userService = new UserService();

    const users = await userService.getUsers();

    const getAuthorInfo = (authorId: string) => {
      const { id, roles, ...args } = users.find(
        (user) => user.id === authorId,
      )!;

      return { ...args };
    };

    const snapshot = await this.admin
      .firestore()
      .collection('posts')
      .where('url', '==', slug)
      .get();

    if (snapshot.empty) {
      return {};
    }

    const post: PostModel[] = [];

    snapshot.forEach((doc) => {
      post.push(doc.data() as PostModel);
    });

    return {
      ...post[0],
      authorInfo: getAuthorInfo(post[0].authorId),
    };
  }
}
