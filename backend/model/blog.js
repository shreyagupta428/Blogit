import mongoose from 'mongoose';

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date
    }
});


const blog = mongoose.model('blog', BlogSchema);

export default blog;