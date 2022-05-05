import { NextFunction, Response, Router } from 'express';
import info from '../../config/info';
import WrongCredentialException from '../../exceptions/wrongCredential.exception';
import Controller from '../../interfaces/controller.interface';
import ReqWithUser from '../../interfaces/reqWithUser.interface';
import { fileFetch, saveFile } from '../../utils/fileUpload';
import ValidateDto from '../../utils/validate.dto';
import { CreateDto } from './dto/create.dto';
import SubmissionService from './submission.service';

export default class SubmissionController implements Controller {
    public router = Router();
    public service = new SubmissionService();
    constructor() {
        this.initRoutes();
    }
    public initRoutes() {
        this.router.post('/', fileFetch.single('file'), this.create);
    }

    public create = async (
        req: ReqWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (req.file) {
                const filename = saveFile(req.file);
                req.body.link = `http://${info.host}/files/${filename}`;
            }
            const submissionData = await ValidateDto<CreateDto>(
                CreateDto,
                req.body
            );
            const studentId = req.user?._id;
            if (!studentId) {
                throw new WrongCredentialException();
            }
            const resData = await this.service.create(
                submissionData,
                studentId
            );
            res.send(resData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
}
