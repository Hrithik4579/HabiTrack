const mongoose = require('mongoose' ) ;
const { Schema } = mongoose;


const noteSchema = new Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    status: {
        type: String,
        default: "Active"
    },
    date:{
        type:Date,
        default: Date.now
    }
  
});

module.exports=  mongoose.model('note', noteSchema)