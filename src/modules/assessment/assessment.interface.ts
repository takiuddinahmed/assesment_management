
interface Assessment extends Document {
    _id: string;
    title: string;
    description: string;
    mentorId: string;
    createdAt: Date;
    deadline: Date;
}

export default Assessment;
