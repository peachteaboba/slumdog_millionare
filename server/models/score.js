/**
 * Created by Andy Feng on 1/27/17.
 */

// Require Mongoose
var mongoose = require('mongoose');


var ScoreSchema = new mongoose.Schema({
    name: {type: String, required: true},
    score: {type: Number, required: true}
}, {timestamps: true});

mongoose.model('Score', ScoreSchema);
