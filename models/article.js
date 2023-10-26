
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    photos: [String]  // Array of photo URLs
}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
