/**
 * Created by Andy Feng on 1/27/17.
 */

// Require Mongoose
var mongoose = require('mongoose');


var QuestionSchema = new mongoose.Schema({
    question: {type: String, required: true, minlength: 15},
    correct_answer: {type: String, required: true},
    fake_answer1: {type: String, required: true},
    fake_answer2: {type: String, required: true}
}, {timestamps: true});

mongoose.model('Question', QuestionSchema);