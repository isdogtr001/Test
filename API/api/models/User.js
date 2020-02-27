const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    faculty: { type: String, required: true },
    branch: { type: String, required: true },
    student_id: { type: String, required: true },
    telephone: { type: String, required: true },
    user_name: { type: String, required: true },
    admin: { type: Boolean, required: true },
    // project_president: [{ type: String }],
    // task_leader: [{ type: String}],
    Img: { type: String },
  
   // tank_admin: [{ email: { type: String }, name: { type: String } }],


});

module.exports = mongoose.model('User', UserSchema);