import { model, Schema, Date } from 'mongoose';
import Assessment from './assessment.interface';

const assessmentSchema = new Schema({
    title: String,
    description: String,
    mentorId: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    deadline: {
        type: Date,
    },
});

const assessmentModel = model<Assessment>('Assessment',assessmentSchema);

export default assessmentModel;

