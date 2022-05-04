import { Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import Module from '../../interfaces/module';
import authMiddleware from '../../middlewares/auth.middleware';
import AssessmentController from './assessment.controller';

class AssessmentModule implements Module {
    controller: Controller = new AssessmentController();
    router: Router = Router();
    path: string = '/assessment';

    constructor() {
        this.initializeRouter();
    }

    private initializeRouter() {
        this.router.use(authMiddleware,this.controller.router);
    }
}

export default AssessmentModule;
