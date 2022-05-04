import App from './app';
import connectDb from './config/mongoose';
import dotenv from 'dotenv';
import UserModule from './modules/user/user.module';
import AssessmentModule from './modules/assessment/assessment.module';
1;
dotenv.config();

const port = process.env.PORT || 3500;

connectDb();

const app = new App([new UserModule(), new AssessmentModule()]);

app.listen();
