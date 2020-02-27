const mongoose = require('mongoose');

const subtankSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subtank_name: { type: String, required: true },
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tank', required: true },
    sub_tank_leader: [{ type: String, required: true }],
    sub_tank_explanation: { type: String, required: true },
    sub_tank_faculty: { type: String, required: true },
    sub_tank_branch: { type: String, required: true },
    sub_tank_budget: { type: Number, required: true },
    sub_tank_telephone: { type: String, required: true },
    sub_tank_comment: { type: String},
    sub_tank_status: { type: String, required: true },
    sub_tank_admin: { type: String, required: true },
    img: [{ type: String }]

});

module.exports = mongoose.model('SubTank', subtankSchema);