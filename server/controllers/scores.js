/**
 * Created by Andy Feng on 1/27/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

// Require the model and save it in a variable
var Score = mongoose.model('Score');



module.exports = (function() {
    return {

        saveScore: function(req, res) {

            console.log(req.body);

            var score = new Score(req.body);


            score.save(function(err){
                if(err){
                    console.log("========== error saving score ==========".red);
                    console.log(err);
                    console.log("========== error saving score ==========".red);
                } else {
                    console.log("========== successfully saved score ==========".green);
                    console.log(score);
                    console.log("========== successfully saved score ==========".green);
                    res.json(score);
                }

            })





        },
        getScores: function(req, res) {

            Score.find({}, function(err, result){
                if(err){
                    console.log("========== error getting score ==========".red);
                    console.log(err);
                    console.log("========== error getting score ==========".red);
                } else {
                    console.log("========== successfully got scores ==========".green);
                    console.log(result);
                    console.log("========== successfully got scores ==========".green);
                    res.json(result);
                }
            })



        }


    }
})();
