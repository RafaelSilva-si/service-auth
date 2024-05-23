import express, { Express } from 'express';
import router from './routes';
import envs from './config/global';

class App {
  public express: Express;

  constructor() {
    this.express = express();
    this.middlewares();
    this.setupRoutes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.express.use('/', router);
  }

  public start(port: number): void {
    this.express.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const app = new App();
const port = envs.PORT ? parseInt(envs.PORT, 10) : 3002;
app.start(port);
