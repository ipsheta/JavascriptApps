const quizData = [{
    question: 'Q1. How many schengen countries are there?',
    a: '20',
    b: '22',
    c: '28',
    d: '26',
    correct: 'c'
},
{
    question: 'Q2. What is most popular prog. language?',
    a: 'Java',
    b: 'Javascript',
    c: 'Python',
    d: 'C',
    correct: 'b'
},
{
    question: 'Q3. Who is the current president of USA?',
    a: 'Bill Clinton',
    b: 'Barak Obama',
    c: 'Joe Byden',
    d: 'Donald Trump',
    correct: 'c'
},
{
    question: 'Q4. What does HTML stands for?',
    a: 'HyperText Markup Language',
    b: 'Cascading Style Sheet',
    c: 'Javascript Object Notation',
    d: 'Helicopter Terminals Motorboats Lamborghini',
    correct: 'a'
},
{
    question: 'Q5. How Many Technical Universities in Germany?',
    a: '15',
    b: '17',
    c: '19',
    d: '21',
    correct: 'b'
},
{
    question: 'Q6. The world smallest country is',
    a: 'Canada',
    b: 'Maldives',
    c: 'Moldova',
    d: 'Vatican City',
    correct: 'd'
},
{
    question: 'Q7. How many states in germany?',
    a: '14',
    b: '15',
    c: '16',
    d: '17',
    correct: 'c'
},
{
    question: 'Q8. How many stars in USA flag?',
    a: '40',
    b: '50',
    c: '45',
    d: '55',
    correct: 'b'
},
{
    question: 'Q9. Javascript was launched in..',
    a: '1996',
    b: '1995',
    c: '1994',
    d: '1997',
    correct: 'b'
},
{
    question: 'Q10. Which one is the most expensive country in the world?',
    a: 'Switzerland',
    b: 'Bermuda',
    c: 'Norway',
    d: 'Tokyo',
    correct: 'b'
}
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const evaluateBtn = document.getElementById("evaluateAns");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

//Deselect option for new loaded question
function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    //Do not load next question if answer is not selected
    const answer = getSelected();


    if (answer) {
        //Remove previous evaluation if exists
        removePrevEvaluation();
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            const percentage = (score / quizData.length) * 100;
            quiz.innerHTML = `<h2 style="text-align: center;
            padding: 2rem;">You answered correctly at ${score}/${quizData.length} questions and got ${percentage}% marks.</h2>
            <button onclick="location.reload()">Reload Quiz</button>`;
        }
    }
});

evaluateBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        removePrevEvaluation();
        if (answer === quizData[currentQuiz].correct) {
            showSuccess();
        } else {
            showCorrectAnswer();
        }
    }else{
        alert("Select an option first!");
    }
});


function showSuccess() {
    const statusCorrect = document.createElement("p");
    statusCorrect.setAttribute("id", "correct");
    const corrTextNode = document.createTextNode("Correct Answer");
    statusCorrect.appendChild(corrTextNode);

    quiz.insertBefore(statusCorrect, submitBtn);
}

function showCorrectAnswer() {
    const statusIncorrect = document.createElement("p");
    statusIncorrect.setAttribute("id", "incorrect");
    const incorrTextNode = document.createTextNode("Incorrect! Correct is option: " + quizData[currentQuiz].correct);
    statusIncorrect.appendChild(incorrTextNode);

    //console.log("correct answer node created...." + quizData[currentQuiz].correct);
    quiz.insertBefore(statusIncorrect, submitBtn);

}

function removePrevEvaluation() {
    if (document.contains(document.getElementById("correct"))) {
        document.getElementById("correct").remove();
    }
    if (document.contains(document.getElementById("incorrect"))) {
        document.getElementById("incorrect").remove();
    }
}