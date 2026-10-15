const questions =[
    {
        question: "What is the time complexity of QuickSort in the average case?",
        answers: [
            { text: "O(n²)", correct: false },
            { text: "O(n log n)", correct: true },
            { text: "O(log n)", correct: false },
            { text: "O(n)", correct: false }
        ]
    },
    {
        question: "Which HTTP status code represents 'Too Many Requests'?",
        answers: [
            { text: "401", correct: false },
            { text: "403", correct: false },
            { text: "429", correct: true },
            { text: "503", correct: false }
        ]
    },
    {
        question: "In React, which hook is used to memoize expensive calculations?",
        answers: [
            { text: "useCallback", correct: false },
            { text: "useRef", correct: false },
            { text: "useMemo", correct: true },
            { text: "useEffect", correct: false }
        ]
    },
    {
        question: "What is a 'deadlock' in operating systems?",
        answers: [
            { text: "A process consuming 100% CPU", correct: false },
            { text: "Two or more processes waiting on each other indefinitely", correct: true },
            { text: "A memory leak causing system crash", correct: false },
            { text: "A corrupted thread in execution", correct: false }
        ]
    },
    {
        question: "Which design pattern ensures a class has only one instance?",
        answers: [
            { text: "Factory Pattern", correct: false },
            { text: "Observer Pattern", correct: false },
            { text: "Prototype Pattern", correct: false },
            { text: "Singleton Pattern", correct: true }
        ]
    },
    {
        question: "What does the CAP theorem state in distributed systems?",
        answers: [
            { text: "A system can guarantee Consistency, Availability, and Partition tolerance simultaneously", correct: false },
            { text: "A system can only guarantee two of: Consistency, Availability, Partition tolerance", correct: true },
            { text: "Consistency always takes priority over Availability", correct: false },
            { text: "Partition tolerance is optional in distributed systems", correct: false }
        ]
    },
    {
        question: "Which algorithm is used by Git to generate commit hashes?",
        answers: [
            { text: "MD5", correct: false },
            { text: "SHA-256", correct: false },
            { text: "SHA-1", correct: true },
            { text: "bcrypt", correct: false }
        ]
    },
    {
        question: "What is 'hydration' in the context of server-side rendering (SSR)?",
        answers: [
            { text: "Fetching data from an API on the server", correct: false },
            { text: "Compressing assets before sending to the client", correct: false },
            { text: "Attaching JavaScript event listeners to server-rendered HTML on the client", correct: true },
            { text: "Caching HTML responses at the CDN level", correct: false }
        ]
    },
    {
        question: "In machine learning, what problem does 'dropout' regularization solve?",
        answers: [
            { text: "Underfitting by adding more neurons", correct: false },
            { text: "Overfitting by randomly deactivating neurons during training", correct: true },
            { text: "Vanishing gradient by normalizing layer outputs", correct: false },
            { text: "Slow convergence by adjusting the learning rate", correct: false }
        ]
    },
    {
        question: "What is the primary difference between TCP and UDP?",
        answers: [
            { text: "TCP is faster but less secure than UDP", correct: false },
            { text: "UDP supports more concurrent connections than TCP", correct: false },
            { text: "TCP guarantees ordered delivery; UDP does not", correct: true },
            { text: "UDP requires a handshake before transmission", correct: false }
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion(){
         resetState();
         let currentQuestion = questions[currentQuestionIndex];
         let questionNo = currentQuestionIndex + 1;
         questionElement.innerHTML = questionNo + " ." + currentQuestion.question;
        

         currentQuestion.answers.forEach(answer =>{
            const button = document.createElement("button");
            button.innerHTML  = answer.text;
            button.classList.add("btn");
            answerButton.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click",selectAnswer);
            
           
         });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);

    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct ==="true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
           button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display ="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();

    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
       startQuiz();
    }
});

startQuiz();




