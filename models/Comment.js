

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    status: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// const Comment = mongoose.model('comment', CommentSchema, 'Comments');
// module.exports = Comment;

mongoose.model('comment', CommentSchema, 'Comments');


