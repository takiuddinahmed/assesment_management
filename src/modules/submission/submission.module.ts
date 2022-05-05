import { Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import Module from '../../interfaces/module';
import authMiddleware from '../../middlewares/auth.middleware';
import SubmissionController from './submission.controller';

class SubmissionModule implements Module {
    controller: Controller = new SubmissionController();
    router: Router = Router();
    path: string = '/submission';

    constructor() {
        this.initializeRouter();
    }

    private initializeRouter() {
        this.router.use(authMiddleware,this.controller.router);
    }
}

export default SubmissionModule;
