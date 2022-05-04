import { MongooseError } from 'mongoose';
import HttpException from '../../exceptions/http.exception';
import InvalidDocumentException from '../../exceptions/invalidDocument.exception';
import ServerException from '../../exceptions/server.exception';
import Service from '../../interfaces/service';
import Assessment from './assessment.interface';
import assessmentModel from './assessment.model';
import CreateDto from './dto/create.dto';
import EditDto from './dto/edit.dto';

class AssessmentService implements Service {
    private assessmentModel = assessmentModel;
    public create = async (createData: CreateDto, mentorId: string) => {
        try {
            const newAss = await assessmentModel.create({
                ...createData,
                mentorId,
            });
            return await newAss.save();
        } catch (err) {
            console.log({ err });
            throw new ServerException();
        }
    };
    public delete = async (documentId: string) => {
        try {
            return await this.assessmentModel.findByIdAndDelete(documentId);
        } catch (err) {
            console.log({ err });
            throw new ServerException();
        }
    };

    public edit = async (editData: EditDto) => {
        try {
            return await assessmentModel.findByIdAndUpdate(
                editData.id,
                editData
            );
        } catch (err) {
            console.log(err);
            if (
                // @ts-ignore
                err.name == 'CastError' ||
                // @ts-ignore
                err.name == 'DocumentNotFoundError'
            ) {
                throw new InvalidDocumentException();
            }
            throw new ServerException();
        }
    };
}

export default AssessmentService;
