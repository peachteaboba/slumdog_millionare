/**
 * Created by Andy Feng on 1/27/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

// Require the model and save it in a variable
var Question = mongoose.model('Question');



module.exports = (function() {
    return {

        newQuestion: function(req, res) {
            console.log("========== adding a new question ==========".yellow);
            console.log(req.body);
            console.log("========== adding a new question ==========".yellow);

            // add the new question to the db
            var question = new Question(req.body);
            // Because we made our req.body object exactly like the Question model object
            // We can just put req.body as a whole into the new Question object constructor. :)

            question.save(function(err){
                if(err){
                    console.log("========== error adding a new question ==========".red);
                    console.log(err);
                    console.log("========== error adding a new question ==========".red);
                } else {
                    console.log("========== successfully added a new question ==========".green);
                    console.log(question);
                    console.log("========== successfully added a new question ==========".green);
                    res.json(question);
                }
            });
        },


        getQuestion: function(req, res) {
            console.log("========== getting a new question ==========".yellow);

            // We don't want duplicates... and also we need at least 3
            // So doing the random on the back end turned out to be a bad idea..
            // Let's just get all the questions and do the heavy lifting on the client side.

            Question.find({}, function(err, result){
                if(err){
                    console.log("========== error finding question ==========".red);
                    console.log(err);
                    console.log("========== error finding question ==========".red);
                } else {
                    console.log("========== successfully found all questions ==========".green);
                    console.log(result);
                    console.log("========== successfully found all questions ==========".green);
                    res.json(result);
                }
            });

        }


    }
})();  // <------- don't forget to invoke the function!!!


























// end