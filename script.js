let questions = [
    {
        "question": "Einige Monate haben 30 und einige 31 Tage. Wie viele haben 28 Tage?",
        "answer_1": "1 Monat",
        "answer_2": "Alle Monate",
        "answer_3": "2 Monate",
        "answer_4": "Jeder zweite Monat",
        "right_answer": 2
    },
    {
        "question": "Welcher ist der „rote Planet“ unseres Sonnensystems?",
        "answer_1": "Der Neptun",
        "answer_2": "Der Venus",
        "answer_3": "Der Mars",
        "answer_4": "Die Sonne",
        "right_answer": 3
    },
    {
        "question": "Wie viele Knochen hat ein Erwachsenenkörper?",
        "answer_1": "237",
        "answer_2": "223",
        "answer_3": "206",
        "answer_4": "154",
        "right_answer": 3
    },
    {
        "question": "Wie viele Liter Bier werden in Deutschland pro Kopf jährlich getrunken?",
        "answer_1": "80 Liter Bier",
        "answer_2": "100 Liter Bier",
        "answer_3": "200 Liter Bier",
        "answer_4": "50 Liter Bier",
        "right_answer": 2
    },
    {
        "question": "Wie viele Feldspieler gibt es in einer American-Football-Mannschaft?",
        "answer_1": "9",
        "answer_2": "12",
        "answer_3": "13",
        "answer_4": "11",
        "right_answer": 4
    },
    {
        "question": "Die weltweit meistverkaufte Spielkonsole bis Ende Mai 2023 ist welche?",
        "answer_1": "Game Boy",
        "answer_2": "Xbox 360",
        "answer_3": "Playstation 2",
        "answer_4": "Nintendo Switch",
        "right_answer": 3
    },
    {
        "question": "Wie heißen die besten Freunde von „Harry Potter“?",
        "answer_1": "Die Eule Hedwig und Dobby der Hauself",
        "answer_2": "Sirius Black und Luna Lovegood",
        "answer_3": "Albus Dumbledore und Rubeus Hagrid",
        "answer_4": "Hermine Granger und Ron Weasley",
        "right_answer": 4
    },
    {
        "question": "Wie lange dauert es, bis das Licht der Sonne die Erde erreicht?",
        "answer_1": "8 Sekunden",
        "answer_2": "1 Stunde",
        "answer_3": "2 Minuten",
        "answer_4": "3 Sekunden",
        "right_answer": 1
    },
    {
        "question": "Mit welcher Tiergruppe sind die Dinosaurier am engsten verwandt?",
        "answer_1": "Vögel",
        "answer_2": "Affen",
        "answer_3": "Eidechsen",
        "answer_4": "Alligatoren",
        "right_answer": 1
    },
    {
        "question": "Wie lang ist die Strecke eines Marathons?",
        "answer_1": "12,195km",
        "answer_2": "45,195km",
        "answer_3": "42,195km",
        "answer_4": "10km",
        "right_answer": 2
    },
];

let currentQuestion = 0;
let score = 0;
let percent = 0;

let AUDIO_CORRECT = new Audio('./audio/correct.mp3');
let AUDIO_INCORRECT = new Audio('./audio/incorrect.mp3');
let AUDIO_WIN = new Audio('./audio/win.mp3');


function start() {
    document.getElementById('endScreen').style = 'display: none';

}

function init() {
    let showMaxQuestions = document.getElementById('max-questions');
    let maxQuestions = questions.length;

    showMaxQuestions.innerHTML = `
        ${maxQuestions}
    `;

    disableStartScreen();
    showQuestion();
}

function disableStartScreen() {
    document.getElementById('startScreen').style = 'display: none';
    document.getElementById('card-body').style = '';
    document.getElementById('imageBody').style = '';
}

function showQuestion() {
    let question = questions[currentQuestion];
    let percent = (currentQuestion) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progressBar').style = `width:${percent}%;`;
    document.getElementById('progressBar').innerHTML = `${percent}%`;

    if (currentQuestion == questions.length - 1) {
        document.getElementById('next-btn').innerHTML = 'Zum Ende';
    }

    if (currentQuestion >= questions.length) {
        showEndScreen();
    } else {
        answerOptions(question);
    }
}

function answerOptions(question) {
    document.getElementById('page').innerHTML = `
        ${currentQuestion + 1}
    `;
    document.getElementById('questionTxt').innerHTML = `
        ${question['question']}
    `;

    for (i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).innerHTML = `
            ${question[`answer_${i}`]}
        `;
    }
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectionQuestionNumber = selection.slice(-1);
    let rightAnswerId = `answer_${question['right_answer']}`;

    if (checkTrueOrFalse(selectionQuestionNumber, question)) {
        correct(selection);
    } else {
        incorrect(rightAnswerId, selection);
    }

    disableAnswer();
    unlockedButton();
}

function checkTrueOrFalse(selectionQuestionNumber, question) {
    return selectionQuestionNumber == question['right_answer'];
}

function correct(selection) {
    AUDIO_CORRECT.play();
    document.getElementById(selection).classList.add('bg-green');
    score++;
}

function incorrect(rightAnswerId, selection) {
    AUDIO_INCORRECT.play();
    document.getElementById(selection).classList.add('bg-red');
    document.getElementById(rightAnswerId).classList.add('bg-green');
}

function nextQuestion() {
    currentQuestion++;

    blockButton();
    enableAnswer();
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    for (let number = 1; number < 5; number++) {
        document.getElementById(`answer_${number}`).classList.remove('bg-green');
        document.getElementById(`answer_${number}`).classList.remove('bg-red');
    }
}

function blockButton() {
    document.getElementById('next-btn').disabled = true;
    document.getElementById('next-btn').classList.add('btn-disable');
}

function unlockedButton() {
    document.getElementById('next-btn').disabled = false;
    document.getElementById('next-btn').classList.remove('btn-disable');
}

function showEndScreen() {
    enableEndScreen();
    doYouLowScore();
    doYouMiddleScore();
    doYouWin();
}

function doYouLowScore() {
    if (score < 5) {
        document.getElementById('scoreTxt').innerHTML = /*html*/`
            Du hast <span id="scoreColor" class="scoreTxt" style="color:red;">${score}</span> von <span style="color: lightgreen; padding: 0 2% 0 2%">${questions.length}</span> richtig!
        `;
    }
}

function doYouMiddleScore() {
    if (score >= 5) {
        document.getElementById('scoreTxt').innerHTML = /*html*/`
            Du hast <span id="scoreColor" class="scoreTxt" style="color:orange;">${score}</span> von ${questions.length} richtig!
        `;
    }
}

function enableEndScreen() {
    document.getElementById('card-body').classList.add('d-none');
    document.getElementById('endScreen').style = '';
    document.getElementById('imageBody').style = 'display: none';
}

function doYouWin() {
    if (score == questions.length) {
        AUDIO_WIN.muted = false;
        AUDIO_WIN.play();
        document.getElementById('scoreTxt').innerHTML = /*html*/`
            Du hast <span id="scoreColor" class="scoreTxt" style="color:lightgreen;">${score}</span> von ${questions.length} richtig!
        `;
        winnerImages();
    }
}

function resetGame() {
    document.getElementById('card-body').classList.remove('d-none');
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('imageBody').style = '';

    currentQuestion = 0;
    score = 0;
    disableWinner();
    init();
    AUDIO_WIN.muted = true;
}

function disableAnswer() {
    for (i = 1; i < 5; i++) {
        document.getElementById(`answerBox_${i}`).style = "pointer-events: none;";
    }
}

function enableAnswer() {
    for (i = 1; i < 5; i++) {
        document.getElementById(`answerBox_${i}`).style = "";
    }
}

function winnerImages() {
    document.getElementById('cup1').style = '';
    document.getElementById('cup2').style = '';
    document.getElementById('winner').style = '';
}

function disableWinner() {
    document.getElementById('cup1').style = 'display: none';
    document.getElementById('cup2').style = 'display: none';
    document.getElementById('winner').style = 'display: none';
}