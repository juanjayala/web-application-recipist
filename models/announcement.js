const mongoose = require("mongoose")

const announcementSchema = new mongoose.Schema({
    announcer: String,
    content: String

});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = { Announcement };