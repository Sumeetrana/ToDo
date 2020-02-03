const mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    active: {
        type: Boolean
    },
    taskName: {
        type: String,
        required: "This field is required"
    }
})

module.exports = mongoose.model('Task', taskSchema);