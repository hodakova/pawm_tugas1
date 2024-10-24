const hamburger = document.getElementById('hamburger-menu');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('nav-active');
});

// Question bank
const questionBank = {
    limit: [
        {
            question: "What is the limit of (x² - 1)/(x - 1) as x approaches 1?",
            options: ["0", "1", "2", "Does not exist"],
            correctAnswer: "2"
        },
        {
            question: "What is the limit of sin(x)/x as x approaches 0?",
            options: ["0", "1", "Infinity", "Does not exist"],
            correctAnswer: "1"
        }
    ],
    derivative: [
        {
            question: "What is the derivative of f(x) = 3x²?",
            options: ["6x", "9x", "3x", "3"],
            correctAnswer: "6x"
        },
        {
            question: "What is the derivative of f(x) = sin(x)?",
            options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
            correctAnswer: "cos(x)"
        }
    ],
    integral: [
        {
            question: "What is the integral of f(x) = 2x?",
            options: ["x²", "2x²", "x² + C", "2x² + C"],
            correctAnswer: "x² + C"
        },
        {
            question: "What is the integral of f(x) = 1/x?",
            options: ["ln|x|", "1/x", "x", "x²"],
            correctAnswer: "ln|x|"
        }
    ]
};

let selectedQuestions = {
    limit: null,
    derivative: null,
    integral: null
};

function getRandomQuestion(topic) {
    const questions = questionBank[topic];
    const randomIndex = Math.floor(Math.random() * questions.length);
    selectedQuestions[topic] = questions[randomIndex]; // Store the selected question
    return questions[randomIndex];
}

function generateQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const topics = ['limit', 'derivative', 'integral'];
    topics.forEach(topic => {
        const questionObj = getRandomQuestion(topic);

        const questionBlock = document.createElement('div');
        questionBlock.classList.add('quiz-topic');

        const questionTitle = document.createElement('h2');
        questionTitle.classList.add('quiz-topic-title');
        questionTitle.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);

        const questionText = document.createElement('p');
        questionText.textContent = questionObj.question;

        const form = document.createElement('form');
        form.classList.add('quiz-form');
        form.setAttribute('id', `${topic}-quiz`);

        questionObj.options.forEach(option => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', `${topic}-q`);
            input.setAttribute('value', option);
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            form.appendChild(label);
            form.appendChild(document.createElement('br'));
        });

        questionBlock.appendChild(questionTitle);
        questionBlock.appendChild(questionText);
        questionBlock.appendChild(form);
        quizContainer.appendChild(questionBlock);
    });
}

window.onload = generateQuiz;

function submitQuiz() {
    let score = 0;
    let totalQuestions = 3;

    // Check Limit Quiz
    const limitAnswer = document.querySelector('input[name="limit-q"]:checked');
    if (limitAnswer && limitAnswer.value === selectedQuestions.limit.correctAnswer) {
        score++;
    }

    // Check Derivative Quiz
    const derivativeAnswer = document.querySelector('input[name="derivative-q"]:checked');
    if (derivativeAnswer && derivativeAnswer.value === selectedQuestions.derivative.correctAnswer) {
        score++;
    }

    // Check Integral Quiz
    const integralAnswer = document.querySelector('input[name="integral-q"]:checked');
    if (integralAnswer && integralAnswer.value === selectedQuestions.integral.correctAnswer) {
        score++;
    }

    // Display the result
    const resultText = `You got ${score} out of ${totalQuestions} correct!`;
    document.getElementById('result-text').textContent = resultText;
    document.getElementById('quiz-result').style.display = 'block';
}