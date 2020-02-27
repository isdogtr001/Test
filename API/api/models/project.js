const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    project_name: { type: String, required: true },
    project_president: { type: String, required: true },
    project_faculty: { type: String, required: true },
    project_branch: { type: String, required: true },
    project_budget: { type: Number, required: true },
    project_telephone: { type: String, required: true },
    project_status: { type: String, required: true },
    project_admin: { type: String, required: true },
    img: [{ type: String }],
    date: { type: String, required: true }
    //task: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }, name: { type: String, required: true }, status: { type: String, required: true } }],


});

module.exports = mongoose.model('Project', projectSchema);