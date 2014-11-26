var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: { 
        type: String, 
        trim: true, 
        required: true 
    },
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    },
    content: { 
        type: String, 
        required: true 
    },
    tag: { 
        type: [], 
        lowercase: true 
    }
})

module.exports = mongoose.model('Article', articleSchema); 