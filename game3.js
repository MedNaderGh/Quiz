const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = Number(localStorage.getItem('CurrentScore'))
scoreText.innerText = score
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Lequel de ces pays est le plus grand pays sans littoral du monde?',
        choice1: 'Bolivia',
        choice2: 'Paraguay',
        choice3: 'L Afrique Central',
        choice4: 'Kazakhstan',
        answer: 4,
    },
    {
        question:
            "Quel pays a la plus grande population musulmane?",
        choice1: "Nigeria",
        choice2: "Libya",
        choice3: "Indonesia",
        choice4: "Iraq",
        answer: 3,
    },
    {
        question: "Quel pays européen est divisé en départements?",
        choice1: "Allemagne",
        choice2: "France",
        choice3: "Suede",
        choice4: "Italie",
        answer: 2,
    },
    {
        question: "Lequel de ces pays est considéré comme la plus ancienne république du monde?",
        choice1: "Monaco",
        choice2: "Andorra",
        choice3: "San Marina",
        choice4: "Iceland",
        answer: 3,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 4
const MIN_SCORE = 3

startGame = () => {
    questionCounter = 0
    score = Number(localStorage.getItem('CurrentScore'))
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('CurrentScore', score)
        
            return window.location.assign('end.html')    
    
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()