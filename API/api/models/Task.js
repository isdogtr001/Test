const mongoose = require('mongoose');

const tankSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tank_name: { type: String, required: true },
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    tank_leader: [{ type: String, required: true }],
    tank_explanation: { type: String, required: true },
    tank_faculty: { type: String, required: true },
    tank_branch: { type: String, required: true },
    tank_budget: { type: Number, required: true },
    tank_telephone: { type: String, required: true },
    tank_status: { type: String, required: true },
    tank_admin: { type: String, required: true },
    img: [{ type: String }]

});

module.exports = mongoose.model('Tank', tankSchema);