import { NextFunction, Response, Router } from 'express';
import info from '../../config/info';
import WrongCredentialException from '../../exceptions/wrongCredential.exception';
import Controller from '../../interfaces/controller.interface';
import ReqWithUser from '../../interfaces/reqWithUser.interface';
import { checkRoles } from '../../middlewares/auth.middleware';
import { fileFetch, saveFile } from '../../utils/fileUpload';
import ValidateDto from '../../utils/validate.dto';
import UserRole from '../user/enum/role.enum';
import { CreateSubmissionDto } from './dto/createSubmission.dto';
import CreateGradeDto from './dto/createGrade.dto';
import SubmissionService from './submission.service';
import { EditSubmissionDto } from './dto/editSubmssion.dto';
import InvalidDocumentException from '../../exceptions/invalidDocument.exception';
import EditGradeDto from './dto/editGrade.dto';

export default class SubmissionController implements Controller {
    public router = Router();
    public service = new SubmissionService();
    constructor() {
        this.initRoutes();
    }
    public initRoutes() {
        this.router.get('/', this.getSubmission);
        this.router.post('/', fileFetch.single('file'), this.createSubmission);
        this.router.put(
            '/',
            checkRoles([UserRole.ADMIN]),
            fileFetch.single('file'),
            this.editSubmission
        );
        this.router.delete(
            '/:documentId',
            checkRoles([UserRole.ADMIN]),
            this.deleteSubmission
        );
        this.router.post(
            '/grade/:submissionId',
            checkRoles([UserRole.MENTOR, UserRole.ADMIN]),
            this.createGrade
        );
        this.router.put(
            '/grade/:submissionId',
            checkRoles([UserRole.ADMIN]),
            this.editGrade
        );
    }

    public getSubmission = async (
        req: ReqWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            let filter = {};
            if (req?.user?.role == UserRole.STUDENT) {
                filter = { studentId: req.user?._id };
            }
            const resData = await this.service.getSubmission(filter);
            res.send(resData);
        } catch (err) {
            next(err);
        }
    };

    public createSubmission = async (
        req: ReqWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (req?.file) {
                const filename = saveFile(req.file);
                req.body.link = `http://${info.host}/files/${filename}`;
            }
            const submissionData = await ValidateDto<CreateSubmissionDto>(
                CreateSubmissionDto,
                req.body
            );
            const studentId = req.user?._id;
            if (!studentId) {
                throw new WrongCredentialException();
            }
            const resData = await this.service.createSubmission(
                submissionData,
                studentId
            );
            res.send(resData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    };

    public editSubmission = async (
        req: ReqWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (req?.file) {
                const filename = saveFile(req.file);
                req.body.link = `http://${info.host}/files/${filename}`;
            }
            const editData = await ValidateDto<EditSubmissionDto>(
                EditSubmissionDto,
                req.body
            );
            const resData = await this.service.editSubmission(editData);

            if (!resData) throw new InvalidDocumentException();
            res.send(resData);
        } catch (err) {
            console.log({ err });
            next(err);
        }
    };

    private deleteSubmission = async (
        req: ReqWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const documentId = req.params.documentId;
            const resData = await this.service.deleteSubmission(documentId);
            if (!resData) throw new InvalidDocumentException();
            res.send(resData);
        } catch (err) {
            console.log({ err });
            next(err);
        }
    };

    public createGrade = async (
        req: ReqWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const submissionId = req.params.submissionId;
            const gradeData = await ValidateDto<CreateGradeDto>(
                CreateGradeDto,
                req.body
            );
            const resData = await this.service.createGrade(
                gradeData,
                submissionId,
                req.user
            );
            res.send(resData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
    public editGrade = async (
        req: ReqWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const submissionId = req.params.submissionId;
            const gradeData = await ValidateDto<EditGradeDto>(
                EditGradeDto,
                req.body
            );
            const resData = await this.service.editGrade(
                gradeData,
                submissionId
            );
            res.send(resData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
}
