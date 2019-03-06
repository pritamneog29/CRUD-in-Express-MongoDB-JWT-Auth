const mongoose = require("mongoose");

var listingSchema = new mongoose.Schema({
    Name: String,
    Image: String,
    Details: String,
    Segment: String
});

module.exports = mongoose.model("Listing", listingSchema);