import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import PostController from '../controllers/post.controller';

class PostRoute implements Routes {
    public path = '/api/v1/posts';
    public router = Router();
    public controller = new PostController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.controller.list);
        this.router.get(`${this.path}/tags`, authMiddleware, this.controller.listTags);
    }
}

export default PostRoute;
