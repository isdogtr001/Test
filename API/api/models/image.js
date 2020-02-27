const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    belong_ids: { type: String, required: true },
    Img: { type: String },


    //task: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }, name: { type: String, required: true }, status: { type: String, required: true } }],


});

module.exports = mongoose.model('Image', ImageSchema);