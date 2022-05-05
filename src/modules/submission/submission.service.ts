import ServerException from '../../exceptions/server.exception';
import { CreateDto } from './dto/create.dto';
import submissionModel from './submission.model';

export default class SubmissionService {
    public submisisonModel = submissionModel;
    public create = async (data: CreateDto, studentId: string) => {
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
}
