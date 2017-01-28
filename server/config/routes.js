/**
 * Created by Andy Feng on 1/27/17.
 */

// Require the controllers
var scores = require('./../controllers/scores.js');
var questions = require('./../controllers/questions.js');

// Define the routes
module.exports = function(app) {





    // Question routes ===============================================
    app.post('/newQuestion', function(req, res) {
        questions.newQuestion(req, res);
    });

    app.get('/getQuestion', function(req, res) {
        questions.getQuestion(req, res);
    });


    // Score routes ==================================================
    app.post('/saveScore', function(req, res) {
        scores.saveScore(req, res);
    });
    app.get('/getScores', function(req, res) {
        scores.getScores(req, res);
    });

};
