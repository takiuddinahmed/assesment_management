import mongoose from 'mongoose';
import UserRole from './enum/role.enum';
import User from './user.interface';

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            unique: true,
            type: String,
        },
        password: {
            type: String,
            get: (): undefined => undefined,
        },
        refreshTokens: {
            type: Array,
            get: (): undefined => undefined,
            default: [],
        },
        userRole: {
            type: String,
            enum: UserRole,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

// userSchema.virtual('fullname').get(() => {
//     return `${this.firstName} ${this.lastName}`;
// });

const userModel = mongoose.model<User>('User', userSchema);

export default userModel;
