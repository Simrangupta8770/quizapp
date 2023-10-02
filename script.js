const questions = [
    {
        question: "Which language is used for styling web page?",
        options: ["HTML", "CSS", "Javascript", "React"],
        correctAnswer: "CSS"
    },
    {
        question: "Which language is used for making dynamic web page?",
        options: ["HTML", "CSS", "Javascript", "React"],
        correctAnswer: "Javascript"
    },
    {
        question: "Which is a javascript library?",
        options: ["HTML", "CSS", "Javascript", "React"],
        correctAnswer: "React"
    },
    {
        question: "Which is used to create the structure of web pages?",
        options: ["HTML", "CSS", "Javascript", "React"],
        correctAnswer: "HTML"
    },
    {
        question: "Tag used for adding external css sheet to html?",
        options: ["link", "script", "Javascript", "React"],
        correctAnswer: "link"
    }
];
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const quesCon = document.getElementById("question-container");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-button");
const reButton = document.getElementById("restart-button");
const timerElement = document.getElementById("timer");
let currentQuestionIndex = 0;
let score = 0;
const startQuiz = () => {
    const stButton = document.getElementById("start-button");
    stButton.style.display = "none";
    reButton.style.display = "none";
    timerElement.style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();

}
var timeLeft = 10;
const startTimer=()=>{
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;
  
    const timer = setInterval(function () {
      timeLeft--;
  
      if (timeLeft < 0) {
        clearInterval(timer);
        timeLeft = 0;
        handleTimeout();
      }
  
      timerElement.textContent = `Time Left: ${timeLeft} seconds`;
    }, 1000);
  }
 const handleTimeout=()=>{
    resultElement.textContent = "Time's up! The correct answer is: " + questions[currentQuestionIndex].correctAnswer;
    nextButton.style.display = "block";
    optionsContainer.querySelectorAll("button").forEach(button => {
      button.disabled = true;
    });
  }

function displayQuestion() {
    timeLeft = 10; 
  
        quesCon.style.display = "block";
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    var i = 0;
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.setAttribute("d-opt" ,i )
        button.addEventListener("click",checkAnswer)
        optionsContainer.appendChild(button);
        i++;
    });

    nextButton.style.display = "none";
    startTimer(); 
}


function checkAnswer(event) {
    console.log(event.target.getAttribute("d-opt"));
    event.target.style.backgroundColor = "#003d80";
    const sel = event.target.getAttribute("d-opt");
    const selectedAnswer = questions[currentQuestionIndex].options[sel];
    const currentQuestion = questions[currentQuestionIndex];
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
        event.target.style.backgroundColor = "green";
    } else {
        resultElement.textContent = "Incorrect. The correct answer is: " + currentQuestion.correctAnswer;
        event.target.style.backgroundColor = "red";
    }

    nextButton.style.display = "block";
    optionsContainer.querySelectorAll("button").forEach(button => {
        button.disabled = true;
    });
    handleTimeout();
    timeLeft = 0;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        resultElement.textContent = "";
        optionsContainer.querySelectorAll("button").forEach(button => {
            button.disabled = false;
        });
    } else {
        displayResult();
    }
}

function displayResult() {
    timerElement.style.display = "none";
    questionElement.textContent = `Quiz Completed! Your Score: ${score} out of ${questions.length}`;
    optionsContainer.innerHTML = "";
    resultElement.textContent = "";
    nextButton.style.display = "none";
    reButton.style.display = "block";
}