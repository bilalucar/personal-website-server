import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { PostRoute } from '../routes/post-route';

class App {
  public app: express.Application;

  private postRoute = new PostRoute();

  constructor() {
    this.app = express();
    this.config();

    this.postRoute.route(this.app);
  }

  private config(): void {
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE'],
        optionsSuccessStatus: 204,
      }),
    );

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}
export default new App().app;
