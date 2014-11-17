var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: { type: String, trim: true, required: true },
    createdBy: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    content: { type: String, required: true },
    tag: { type: String, lowercase: true }
})

module.exports = mongoose.model('Article', articleSchema); 