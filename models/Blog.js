const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const BlogSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    author_id:{
        type: ObjectId,
        required: true,
    },
    content:{
        type: String,
        required: true,

    },
    
},
{ timestamps: true }
);
// BlogSchema.plugin(mongoosePaginate);
const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;
