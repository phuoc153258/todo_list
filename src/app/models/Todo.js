const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema(
    {
        work: { type: String, minlength: 1 },
        isCompleted: { type: Boolean, default: false, },
    }
);

module.exports = mongoose.model('Todo', Todo);