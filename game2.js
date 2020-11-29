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
        question: 'Ned Stark avait une sœur qui a été enlevée par le Mad King. Quel était son nom?',
        choice1: 'Daenerys Targaryen',
        choice2: 'Lyanna Stark',
        choice3: 'Arya Stark',
        choice4: 'Lyanna Mormont',
        answer: 2,
    },
    {
        question:
            "Lequel de ces personnages n'est PAS mort pendant le Red Wedding?",
        choice1: "Talis Stark",
        choice2: "Edmure Tully",
        choice3: "Catelyn Stark",
        choice4: "Rob Stark",
        answer: 2,
    },
    {
        question: "Quel est le surnom de Ser Davos?",
        choice1: "The Onion Knight",
        choice2: "Blackfish",
        choice3: "Littlefinger",
        choice4: "The Halfhand",
        answer: 1,
    },
    {
        question: "Qui est le plus jeune des enfants de Ned Stark?",
        choice1: "Rickon",
        choice2: "Arya",
        choice3: "Sansa",
        choice4: "Rob",
        answer: 1,
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
        if(score<MIN_SCORE*2){
            if(confirm("Score = "+score+" insuffisant pour passer au troisieme phase Voulez vous ressayez ?"))
            return window.location.assign('game.html')
            else return window.location.assign('index.html')
        }else{
            return window.location.assign('game3.html') 
        }    
    
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