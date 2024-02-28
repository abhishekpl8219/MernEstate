import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default:"data:image/jpeg;base64,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"
      },
    accessToken: String,
      
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;