// FUNCTIONS

(function(){ // wraps entire quiz in IIFE - keeps variables out of global scope

    function buildQuiz(){
        //var to store HTML output
        const output = [];
        //for each question...
        myQuestions.forEach( // this is a loop
            (currentQuestion, questionNumber) => { // arrow function
                // variable to store the list of possible answers
                const answers = [];
                // and for each available answer 
                for(letter in currentQuestion.answers){
                    // add a HTML radio button
                    answers.push(
                        `<label> 
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter}:
                        ${currentQuestion.answers[letter]}
                        </label>
                        `
                    );
                }
                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
                     <div class="question"> ${currentQuestion.question} </div>
                     <div class="answers"> ${answers.join ('')} </div>
                     </div>`
                );
            }
        );
        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join(''); 
    }
    
    function showResults(){ // answer-checking loop
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers')
        // keep track of user's answers
        let numCorrect = 0;
        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value; 
            // if answer is correct 
            if (userAnswer === currentQuestion.correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                //color the answers green
                answerContainers[questionNumber].style.color='lightgreen';
            }
            //if answer is wrong or blank
            else {
                //color the answers red 
                answerContainers[questionNumber].style.color = 'red';
            }
        });
        //show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0){
            previousButton.style.display = 'none';
        } 
        else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length-1){
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } 
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

// to update progress bar
// add progress to the progress bar 
function addProgress(){
    //increase myBarWidth by 100/questionsNumber
    myBarWidth += 100 / numberQuestions;
    // make sure that width of the progress bar won't be more than 100% & fix for questionsNumber that are not dividers of 100
    if (myBarWidth > 100) {
        myBarWidth = 100; 
    }
    // update the width #myBar by changing the css
    document.getElementById("myBar").style.width = myBarWidth + "%";
}

// deduct progress
function deductProgress(){
    //decrease myBarWidth by 100/questionsNumber
    myBarWidth -= 100 / myQuestions.length;
    //make sure that the width of the progress bar won't be more than 0% & fix for questionsNumber that are not dividers of 100\
    if (myBarWidth < 0) {
        myBarWidth = 0;
    }
    // update the width #myBar by changing the CSS
    document.getElementById("myBar").style.width = myBarWidth + "%";
}


    //makes the navigation buttons work
    function showNextSlide(){
        showSlide(currentSlide + 1);
        addProgress();
    }

    function showPreviousSlide(){
        showSlide(currentSlide - 1);
        deductProgress();
    }
    
    //VARIABLES
    
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    // create a variable to store the width of #myBar, set it to 0.
    var myBarWidth = 0;
    // create a variable for the number of questions 
    var questionsNumber = 4;

    //create an array with all the questions 
    const myQuestions = [
       
        {
            question: "How many hearts does an octopus have?",
            answers: {
                a: "One",
                b: "Two",
                c: "Three"
            },
            correctAnswer: "c"
        },
        {
            question: "Which mammal has no vocal cords?",
            answers: {
                a: "Giraffe",
                b: "Snake",
                c: "Dolphin"
            },
            correctAnswer: "a"
        },
        {
            question: "How is a group of frogs refered to?",
            answers: {
                a: "An army",
                b: "A spagbowl",
                c: "Spawn"
            },
            correctAnswer: "a"
        },
        {
            question: "How many eyes does a bee have?",
            answers: {
                a: "Three",
                b: "Four",
                c: "Five"
            },
            correctAnswer: "c"
        }
    ];
    
    // count the questions
    var numberQuestions = myQuestions.length;
    
    
    // KICK THINGS OFF 
    
    // display quiz right away
    buildQuiz();
    
    //PAGINATION
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0; 

    //Show the first slide
    showSlide(currentSlide);

    // EVENT LISTENERS
    
    // on submit, show results
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
    
    

})();

