import { Document } from "mongoose"

export default interface Submission extends Document {
    _id:string,
    studentId: string,
    assessmentId: string,
    link:string,
    submissionDate: Date,
    grades: Grade
}

export interface Grade extends Document {
    mark: number,
    remark: string
}