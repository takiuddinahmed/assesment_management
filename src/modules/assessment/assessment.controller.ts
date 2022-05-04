import { Response, Router, Request, NextFunction } from 'express';
import InvalidDocumentException from '../../exceptions/invalidDocument.exception';
import WrongCredentialException from '../../exceptions/wrongCredential.exception';
import Controller from '../../interfaces/controller.interface';
import ReqWithUser from '../../interfaces/reqWithUser.interface';
import { checkRoles } from '../../middlewares/auth.middleware';
import ValidateDto from '../../utils/validate.dto';
import UserRole from '../user/enum/role.enum';
import AssessmentService from './assessment.service';
import CreateDto from './dto/create.dto';
import EditDto from './dto/edit.dto';

class AssessmentController implements Controller {
    public router: Router = Router();
    public service: AssessmentService = new AssessmentService();
    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(
            '/',
            checkRoles([UserRole.MENTOR, UserRole.ADMIN]),
            this.create
        );
        this.router.put('/', checkRoles([UserRole.ADMIN]), this.edit);
        this.router.delete('/:documentId', checkRoles([UserRole.ADMIN]), this.delete);
    }

    private create = async (
        req: ReqWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: CreateDto = await ValidateDto<CreateDto>(
                CreateDto,
                req.body
            );
            const mentorId = req?.user?._id || '';
            if (mentorId == '') throw new WrongCredentialException();
            const resData = await this.service.create(data, mentorId);
            return res.send(resData);
        } catch (err) {
            console.log({ err });
            next(err);
        }
    };

    private delete = async (
        req: ReqWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const documentId = req.params.documentId;
            const resData = await this.service.delete(documentId);
            if (!resData) throw new InvalidDocumentException();
            res.send(resData);
        } catch (err) {
            console.log({ err });
            next(err);
        }
    };
    private edit = async (
        req: ReqWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const editData = await ValidateDto<EditDto>(EditDto, req.body);
            const resData = await this.service.edit(editData);
            if (!resData) throw new InvalidDocumentException();
            res.send(resData);
        } catch (err) {
            console.log({ err });
            next(err);
        }
    };

}

export default AssessmentController;
