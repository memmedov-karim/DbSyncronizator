const mongoose = require("mongoose");
const {Schema} = mongoose;

const schedulerSchema = new Schema({

    databasesyncronizator_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'databasesyncronizators'
    },
    syncronization_interval_minute: {
        type: Number,
        default: 1440
    },
    next_update_time: {
        type: Date,
        default: function() {
            return new Date(Date.now() + this.syncronization_interval_minute * 60000);
        }
    },
    collections: [{ type: String }]

}, { timestamps: true });

const Scheduler = mongoose.model('scheduler',schedulerSchema);

module.exports = Scheduler;  