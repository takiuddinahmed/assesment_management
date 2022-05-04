import { connect } from 'mongoose';


async function connectDb() {
    try {
        const uri = process.env.MONGODB_URI || '';
        await connect(uri);
        console.log('Database connected');
    } catch (err) {
        console.log({ err, msg: 'database connection error' });
    }
}

export default connectDb;
