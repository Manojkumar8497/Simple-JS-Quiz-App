import quizData from "./quizData.js";
const quizSection = document.getElementById('quizSection');
const formSubmit = document.querySelector('.welcome-form');
const templateEl = document.getElementById('quiz');

let unAnsweredQuestion = quizData;
let answeredQuestion = [];
// Question section
let questionCount = 0;
let quiz_point = 0;

// Form submit event listener for start button
formSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.querySelector('.userName').value.trim();
    if (!name) {
        return;
    }
    // Store the user name to localstorage
    localStorage.setItem('name', name.toUpperCase());
    const mainSection = document.getElementById('main');
    mainSection.style.display = "none";
    quizPage();
});


// To add the quiz page
function quizPage() {

    const userName = localStorage.getItem("name");
    if (!userName) {
        return;
    }

    const tempContent = document.importNode(templateEl.content, true);
    tempContent.querySelector('.welcome').textContent = `Welcome, ${userName}`;
    quizSection.append(tempContent);
    // Start timer
    startTimer("start");
    // Next question event listener
    const nextBtn = quizSection.querySelector('.btn-next');
    nextBtn.addEventListener('click', nextQuestion);
    // Show question
    show(questionCount);
}

// Return random number
const randomNumGenerator = () => {
    return Math.floor(Math.random() * unAnsweredQuestion.length);
}

// Next question function
const nextQuestion = () => {
    // Calculate the result
    const activeEl = document.querySelector('li.active');
    if (activeEl) {
        calculateResult(activeEl.innerHTML);
    }
    else {
        return;
    }
    questionCount++;
    if (questionCount > unAnsweredQuestion.length - 1) {
        // Stop timer
        startTimer("stop");
        const timerData = document.querySelector('.timer span').textContent;
        const minutes = timerData.split(' : ')[0];
        const seconds = timerData.split(' : ')[1];
        localStorage.setItem("timer", `${minutes} minutes and ${seconds} seconds`);
        location.href = "result.html";
        return;
    }
    // Show question
    show(questionCount);
}

// Result calculation
function calculateResult(userAnswer) {
    if (userAnswer === unAnsweredQuestion[questionCount].answer) {
        quiz_point += 10;
        localStorage.setItem('score', `${quiz_point} out of ${unAnsweredQuestion.length * 10}`);
    }
    else {
        console.log("Wrong answer");
    }
}

// DOM access for question
function show(index) {
    let question = document.querySelector('.question');
    question.innerHTML = `<h4 class="card-title">Q${questionCount + 1}. ${unAnsweredQuestion[index].question}</h4>`;
    const ul = document.createElement('ul');
    ul.className = "option-group";
    unAnsweredQuestion[index].options.forEach(option => {
        let li = document.createElement('li');
        li.className = "option";
        li.textContent = option;
        li.addEventListener('click', toggleOptionClass)
        ul.appendChild(li);
    })
    question.appendChild(ul);
    // answeredQuestion.push(...unAnsweredQuestion.splice(index, 1));
}

// Toggle option class
const toggleOptionClass = (event) => {
    const options = document.querySelectorAll('li');
    options.forEach(option => {
        if (option.textContent != event.target.textContent) {
            option.classList.remove('active');
        }
    })
    event.target.classList.toggle('active');
}

//Timer
let quiz_timer;
const startTimer = (type) => {
    if (type === "stop" && quiz_timer) {
        clearInterval(quiz_timer);
        return;
    }
    let date = new Date(new Date().setTime(0));
    let time = date.getTime();
    let seconds = Math.floor((time % (100 * 60)) / 1000);
    let minutes = Math.floor((time % (100 * 60 * 60)) / (1000 * 60));

    const timerEl = document.querySelector('.timer span');
    quiz_timer = setInterval(() => {
        if (seconds < 59) {
            seconds++;
        }
        else {
            minutes++;
            seconds = 0;
        }
        let formattedMin = minutes < 10 ? `0${minutes}` : minutes;
        let formattedSec = seconds < 10 ? `0${seconds}` : seconds;
        timerEl.innerHTML = `${formattedMin} : ${formattedSec}`;
        console.log(formattedMin, formattedSec);
    }, 1000);
}