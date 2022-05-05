import { model, Schema } from "mongoose";
import Submission from "./submission.interface";

const gradeSchema = new Schema({
    mark: Number,
    remark: String
})

const submissionSchema = new Schema({
    link: String,
    studentId: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    assessmentId: {
        ref: 'Assessment',
        type: Schema.Types.ObjectId
    },
    submissionData: {
        type: Date,
        default: Date.now()
    },
    grade: gradeSchema
})

const submissionModel = model<Submission>('Submission',submissionSchema);

export default submissionModel;