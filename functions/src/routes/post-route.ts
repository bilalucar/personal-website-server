import { Request, Response, Application } from 'express';
import { PostController } from '../controllers/post-controller';

export class PostRoute {
  private postController = new PostController();

  public route(app: Application) {
    app.get('/posts', async (req: Request, res: Response) => {
      await this.postController.getPosts(req, res);
    });
    app.get('/posts/paths', async (req: Request, res: Response) => {
      await this.postController.getPaths(req, res);
    });
    app.get('/posts/:id', async (req: Request, res: Response) => {
      await this.postController.getPost(req, res);
    });
  }
}
