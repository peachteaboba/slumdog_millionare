/**
 * Created by Andy Feng on 1/27/17.
 */

app.controller('homeController', function($scope, homeFactory, $location, $routeParams){

    $scope.name = "";
    $scope.error_login = "";
    $scope.showPrompt = true;

    $scope.error_message = "";
    $scope.message = "";
    $scope.scores = [];

    if($routeParams.score){
        $scope.message = "Your score is " + $routeParams.score + "/3 ";
    }



    // check to see if there is an error to display
    homeFactory.getError(function(data){
        if(data != ""){
            // need to display this message in red
            $scope.error_message = data;
        } else {
            console.log("no errors");
        }
    });


    // check to see if there is a message to display
    homeFactory.getMessage(function(data){
        if(data != ""){
            // need to display this message in GREEN
            $scope.message = data;
        } else {
            console.log("no messages");
        }
    });



    // get all scores
    homeFactory.getScores(function(data){
       $scope.scores = data;


    });





    // we need to go to the factory and see if there is a cached user
    homeFactory.getUser(function(data){
        if(data != ""){
            $scope.name = "";
            $scope.showPrompt = false;
        } else {
            console.log("need to log in");
        }
    });

    $scope.logout = function(){
        console.log("logging user out!!!!!!");

        // we need to un-set the user in the factory
        homeFactory.setUser("", function(){
            $scope.name = "";
            $scope.showPrompt = true;
        });
    };

    $scope.enter = function(){
        console.log($scope.name + " <----- user is attempting to log in");
        if($scope.name != ""){
            // user has entered a valid name

            // we cache the logged in user's name into our factory
            homeFactory.setUser($scope.name, function(){
                console.log("we are back from the factory. we can hide the prompt");
                // Hide the prompt and let user see the home page
                $scope.showPrompt = false;
            });
        } else {
            console.log("user did not enter a name!");
            $scope.error_login = "Please enter a name with at least one letter.."
        }
    };

    $scope.playGame = function(){
        console.log("user clicked on the play game button");

        // we need to redirect to another partial to play the game
        $location.url('play_game');


    };













});








app.controller('newController', function($scope, homeFactory, $location){
    $scope.name = "";
    $scope.error_message = "";

    console.log("in the new controller");


    // we need to go to the factory and see if there is a cached user
    homeFactory.getUser(function(data){
        if(data == ""){
            // not logged in yet.


            // redirect to the home partial
            $location.url('/')


        } else {
            // we are logged in already.
            $scope.name = data;


        }
    });

    $scope.logout = function(){
        console.log("logging user out!!!!!!");

        // we need to un-set the user in the factory
        homeFactory.setUser("", function(){

            // redirect to the home partial
            $location.url('/')

        });
    };


    $scope.cancel = function(){
        console.log("cancel");

        // we need to let the home controller know to display a message
        homeFactory.setError("Submission Canceled", function(){
            // redirect to the home partial
            $location.url('/');
        });

        $scope.newQuestion = {};
    };

    $scope.submit = function(){
        console.log($scope.newQuestion);


        if( !$scope.newQuestion ||
            !$scope.newQuestion.question ||
            !$scope.newQuestion.correct_answer ||
            !$scope.newQuestion.fake_answer1 ||
            !$scope.newQuestion.fake_answer2
        ){
            $scope.error_message = "All fields must be filled";
        } else {
            // All fields are filled

            console.log("all fields are filled");

            if($scope.newQuestion.question.length < 15){
                $scope.error_message = "Question must be at least 15 characters long";

            } else {
                $scope.error_message = "";
                console.log("no errors");

                // make the trek to save the new question into the database
                homeFactory.newQuestion($scope.newQuestion, function(){
                    // when this callback is triggered, we will redirect to the home page with a message
                    // saying that the new question is successfully saved.
                    console.log("successfully saved a new question");


                    // we need to let the home controller know to display a message
                    homeFactory.setMessage("Successfully saved a new question!", function(){
                        // redirect to the home partial
                        $location.url('/');
                    });





                })


            }




        }





        $scope.newQuestion = {};
    }





















});






// =====================================================================================
// PLAY CONTROLLER =====================================================================
// =====================================================================================
app.controller('playController', function($scope, homeFactory, $location){
    $scope.name = "";
    $scope.error_message = "";

    console.log("in the play controller");

    // we need to go to the factory and see if there is a cached user
    homeFactory.getUser(function(data){
        if(data == ""){
            // not logged in yet.


            // redirect to the home partial
            $location.url('/')


        } else {
            // we are logged in already.
            $scope.name = data;

        }
    });


    // get 3 random questions
    homeFactory.getQuestions(function(output){
        console.log(output);
        $scope.questions = [];
        // we just got ALL of the questions from the database..

        if(output.length < 3){
            // Display error to prompt the user to add more questions
            $scope.error_message = "Please add at least 3 questions to continue";

        } else {
            // pick 3 random questions from the questions array (output);
            var tempArr = output;
            $scope.questions = [];

            while($scope.questions.length < 3){
                // we want to push a random question into this array
                var rand = Math.floor(Math.random() * (tempArr.length - 1) + 0);

                // push into new array
                $scope.questions.push(tempArr[rand]);

                // splice the added question out from tempArr (so we don't get dups)
                tempArr.splice(rand, 1);

            }


            console.log("done getting 3 questions");
            console.log($scope.questions);


            // loop thru all the questions
            for(var j=0; j<$scope.questions.length; j++){

                // we want to have the selections display in random order
                // otherwise whats the point of playing..


                var answers = [];

                // we will get a random number from one to three
                // this will determine which slot the correct answer is
                var rand2 = Math.floor(Math.random() * (3) + 1);
                console.log(rand2);

                if(rand2 == 1){
                    answers.push($scope.questions[j].correct_answer);
                    answers.push($scope.questions[j].fake_answer1);
                    answers.push($scope.questions[j].fake_answer2);
                } else if (rand2 == 2){
                    answers.push($scope.questions[j].fake_answer1);
                    answers.push($scope.questions[j].correct_answer);
                    answers.push($scope.questions[j].fake_answer2);
                } else {
                    answers.push($scope.questions[j].fake_answer1);
                    answers.push($scope.questions[j].fake_answer2);
                    answers.push($scope.questions[j].correct_answer);
                }

                $scope.questions[j].answersArr = answers;
            }
        }
    });



    $scope.cancel = function(){
        console.log("cancel");

        // we need to let the home controller know to display a message
        homeFactory.setError("Game Canceled", function(){
            // redirect to the home partial
            $location.url('/');
        });

    };

    $scope.submit = function() {
        // console.log($scope.answer);
        console.log("submitting answers");



        if(!$scope.answer || !$scope.answer.one || !$scope.answer.two || !$scope.answer.three ){
            $scope.error_message = "All questions must be answered";
        } else {
            $scope.error_message = "";
            console.log($scope.answer);

            // we need the name of the user and the score of the game
            var score = 0;

            if($scope.answer.one == $scope.questions[0].correct_answer){
                score++;
            }
            if ($scope.answer.two == $scope.questions[1].correct_answer){
                score++;
            }
            if($scope.answer.three == $scope.questions[2].correct_answer){
                score++;
            }

            console.log(score);
            console.log($scope.name);


            var obj = {
                name: $scope.name,
                score: score
            };




            homeFactory.saveScore(obj, function(){

                console.log("saved the score");


                // redirect
                $location.url('score/' + obj.score);







            });







        }





    };







});





















