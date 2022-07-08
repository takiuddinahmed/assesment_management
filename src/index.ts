import App from './app';
import connectDb from './config/mongoose';
import dotenv from 'dotenv';
import UserModule from './modules/user/user.module';
import AssessmentModule from './modules/assessment/assessment.module';
import SubmissionModule from './modules/submission/submission.module';

dotenv.config();

const port = process.env.PORT || 3500;

connectDb();

const app = new App([
    new UserModule(),
    new AssessmentModule(),
    new SubmissionModule(),
]);

app.listen();
