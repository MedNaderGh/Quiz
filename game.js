const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Un Carthaginois a traversé les Alpes avec son armée et ses éléphants. Qui est-il?',
        choice1: 'Christophe Colomb',
        choice2: 'Ibn Batouta',
        choice3: 'Hannibal',
        choice4: 'Tarak Ibn Zied',
        answer: 3,
    },
    {
        question:
            "En quelle année est proclamée l'indépendance de la Tunisie?",
        choice1: "1955",
        choice2: "1956",
        choice3: "1962",
        choice4: "1945",
        answer: 2,
    },
    {
        question: "La première femme tunisienne  a obtenu son diplôme de médecin en 1936. Qui est-ce?",
        choice1: "Aziza Othmana",
        choice2: "Wahida Ben Cheikh",
        choice3: "Bchira Ben M'Rad",
        choice4: "Alia Menchari",
        answer: 2,
    },
    {
        question: "Quelle est la principale ville de l'île de Djerba?",
        choice1: "Midoun",
        choice2: "Guellala",
        choice3: "Zarzis",
        choice4: "Houmt Souk",
        answer: 4,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 4
const MIN_SCORE = 3

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('CurrentScore', score)
        if(score<MIN_SCORE){
            if(confirm("Score = "+score+" insuffisant pour passer au deuxieme phase Voulez vous ressayez ?"))
            return window.location.assign('game.html')
            else return window.location.assign('index.html')
            
        }else{
            return window.location.assign('game2.html') 
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