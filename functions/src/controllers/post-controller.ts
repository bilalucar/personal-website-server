import { Request, Response } from 'express';
import { PostService } from '../services/post-service';
import { createResponse } from '../utils/http.util';

export class PostController {
  private readonly postService = new PostService();

  public async getPosts(req: Request, res: Response) {
    const data = await this.postService.getPosts();
    const response = createResponse({ data });

    res.status(response.status).send(response);
  }

  public async getPost(req: Request, res: Response) {
    const { id = '' } = req.params;
    const data = await this.postService.getPost(id.toString());
    const response = createResponse({ data });

    res.status(response.status).send(response);
  }

  public async getPaths(req: Request, res: Response) {
    const data = await this.postService.getPostsPath();
    const response = createResponse({ data });

    res.status(response.status).send(response);
  }
}
