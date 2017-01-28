/**
 * Created by Andy Feng on 1/27/17.
 */

app.factory('homeFactory', function ($http) {
    var factory = {};
    var user = "";

    var error = "";
    var message = "";


    // getter and setter for user ===================================
    factory.setUser = function(data, callback){
        user = data;
        callback();
    };
    factory.getUser = function(callback){
        callback(user);
    };

    // getter and setter for error ==================================
    factory.setError = function(data, callback){
        error = data;
        callback();
    };
    factory.getError = function(callback){
        callback(error);
    };

    // getter and setter for message ================================
    factory.setMessage = function(data, callback){
        message = data;
        callback();
    };
    factory.getMessage = function(callback){
        callback(message);
    };






    factory.newQuestion = function(data, callback){
        $http.post('/newQuestion', data).then(function(output){
            console.log(output.data);
            callback();
        });
    };


    factory.getQuestions = function(callback){

        // get 3 questions from the database
        // - what if there are not 3? (handle this on the client side)
        // - how to get random ones? (handle this on the server side if possible)

        $http.get('/getQuestion').then(function(output){
            callback(output.data);
        });
    };


    factory.saveScore = function(data, callback){
        $http.post('/saveScore', data).then(function(output){
            console.log(output.data);
            callback();
        });
    };

    factory.getScores = function(callback){

        $http.get('/getScores').then(function(output){
            callback(output.data);
        });
    };























    return factory;
});



