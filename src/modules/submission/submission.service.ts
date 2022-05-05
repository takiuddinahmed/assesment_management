import ServerException from '../../exceptions/server.exception';
import { CreateSubmissionDto } from './dto/createSubmission.dto';
import CreateGradeDto from './dto/createGrade.dto';
import submissionModel from './submission.model';
import { EditSubmissionDto } from './dto/editSubmssion.dto';
import EditGradeDto from './dto/editGrade.dto';
import { ReqUser } from '../../interfaces/reqWithUser.interface';
import UserRole from '../user/enum/role.enum';
import PermissionException from '../../exceptions/permission.execption';

export default class SubmissionService {
    public submisisonModel = submissionModel;

    public getSubmission = async (filter: any) => {
        try {
            return await this.submisisonModel.find(filter);
        } catch (error) {
            throw new ServerException();
        }
    };

    public createSubmission = async (
        data: CreateSubmissionDto,
        studentId: string
    ) => {
        try {
            return await (
                await submissionModel.create({
                    ...data,
                    studentId,
                })
            ).save();
        } catch (err) {
            throw new ServerException();
        }
    };

    public editSubmission = async (editData: EditSubmissionDto) => {
        try {
            return await this.submisisonModel.findByIdAndUpdate(
                editData.id,
                editData
            );
        } catch (err) {
            throw new ServerException();
        }
    };

    public deleteSubmission = async (documentId: string) => {
        try {
            return await this.submisisonModel.findByIdAndDelete(documentId);
        } catch (err) {
            console.log({ err });
            throw new ServerException();
        }
    };

    public createGrade = async (
        gradeData: CreateGradeDto,
        submissionId: string,
        user: ReqUser | undefined
    ) => {
        try {
            const submission = await this.submisisonModel
                .findById(submissionId)
                .populate('assessmentId');
            if (user?.role == UserRole.MENTOR) {
                // @ts-ignore
                if (submission?.assessmentId?.mentorId != user?._id) {
                    throw new PermissionException();
                }
            }
            return await submission?.updateOne({ grade: gradeData });
        } catch (error) {
            if (error instanceof PermissionException) throw error;
            throw new ServerException();
        }
    };
    public editGrade = async (
        gradeData: EditGradeDto,
        submissionId: string
    ) => {
        try {
            return await this.submisisonModel.findByIdAndUpdate(submissionId, {
                grade: gradeData,
            });
        } catch (error) {
            throw new ServerException();
        }
    };
}
