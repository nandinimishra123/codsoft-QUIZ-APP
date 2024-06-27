let question;
let form;
let res;
let qno;
let score;

const questions = [{
        title: 'India is a federal union comprising twenty-eight states and how many union territories?',
        options: [
            '6',
            '7',
            '8',
            '9'
        ],
        answer: '2',
        score: 1
    },
    {
        title: 'Which of the following is the capital of Arunachal Pradesh ?',
        options: [
            ' Itanagar',
            ' Dispur',
            'Imphal',
            ' Panaji'
        ],
        answer: '0',
        score: 1
    },
    {
        title: 'What are the major languages spoken in Andhra Pradesh?',
        options: [
            'odia',
            'telugu',
            'hindi',
            'All of above'
        ],
        answer: '1',
        score: 1
    },
    {
        title: 'Where is RAM located ?',
        options: [
            'Expansion Board',
            'External Drive',
            'Mother Board',
            'All of above'
        ],
        answer: '2',
        score: 1
    },
    {
        title: 'If a computer has more than one processor then it is known as ?',
        options: [
            'Uniprocess',
            'Multiprocessor',
            'Multithreaded',
            'Multiprogramming'
        ],
        answer: '1',
        score: 1
    },
    {
        title: 'If a computer provides database services to other, then it will be known as ?',
        options: [
            'Web server',
            'Application server',
            'Database server',
            'FTP server'
        ],
        answer: '2',
        score: 1
    },
    {
        title: 'Which of the following part of the Sun is visible to humans? ?',
        options: [
            'photosphere',
            'corona',
            'chromosphere',
            'core'
        ],
        answer: '0',
        score: 1
    },
    {
        title: ' What is the time taken by the light of the Sun to reach the Earth?',
        options: [
            '8 minute',
            '9 minute ',
            '15 minute 30 seconds',
            '8 minute 20 second'
        ],
        answer: '3',
        score: 1
    },
    {
        title: 'Which of the following is the largest planet of the Solar System according to size?',
        options: [
            'jupiter',
            'uranus',
            'saturn',
            'neptune'
        ],
        answer: '0',
        score: 1
    },
    {
        title: 'Which planet in our solar system is known for its prominent rings? ',
        options: [
            'jupiter',
            'saturn',
            'uranus',
            'neptune'
        ],
        answer: '1',
        score: 1
    }
];

function restartScreen() {
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    document.querySelector('.answer-key').style.display = 'block';
    document.querySelector('button').style.display = 'block';
}

function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class", "idle");
    res.innerHTML = "Empty";
}

function evaluate() {
    if (form.op.value == questions[qno].answer) {
        res.setAttribute("class", "correct");
        res.innerHTML = "Correct";
        score += questions[qno].score;

    } else {
        res.setAttribute("class", "incorrect");
        res.innerHTML = "Incorrect";
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled", "");
    })
}

function getNextQuestion() {
    qno++;
    ques = questions[qno];
    question.innerHTML = ques.title;
    const labels = document.querySelectorAll('label');
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx];
    });
}

function handleSubmit(e) {
    e.preventDefault();
    if (!form.op.value) {
        alert('Please select an option');
    } else if (form.submit.classList.contains('submit')) {
        evaluate();
        form.submit.classList.remove('submit');
        form.submit.value = "Next"
        form.submit.classList.add('next');
    } else if (qno < questions.length - 1 && form.submit.classList.contains('next')) {
        getNextQuestion();
        resetradio();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    } else if (form.submit.classList.contains('next')) {
        restartScreen();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
}

function init() {
    document.body.innerHTML = `
        <h1 class="quiz-heading">Quiz</h1>
        <div class="app-body">
            <h1 class="answer-key">Answer Key</h1>
            <div class="question-card">
                <h2 id='question'>Question</h2>
                <form>
                    <input type="radio" id="op1" name="op" value="0">
                    <label for="op1">op1</label><br>
                    <input type="radio" id="op2" name="op" value="1">
                    <label for="op2">op2</label><br>
                    <input type="radio" id="op3" name="op" value="2">
                    <label for="op3">op3</label><br>
                    <input type="radio" id="op4" name="op" value="3">
                    <label for="op4">op4</label><br>
                    <div id = "res" class="idle">Empty</div><br>
                    <input type="submit" name="submit" value = 'Submit' class = "submit"/>
                </form>
            </div>
            <button>Restart</button>
        </div>
    `;
    question = document.querySelector('#question');
    form = document.querySelector('form');
    res = document.querySelector('#res');
    qno = -1;
    score = 0;
    form.addEventListener('submit', handleSubmit);
    document.querySelector('button').addEventListener('click', init);
    getNextQuestion();
}
document.querySelector('button').addEventListener('click', init);
init();