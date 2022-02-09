
container = requrie('../containerConfig')
const mongoose = container.resole('mongoose')
const Schema = mongoose.Schema;


const solevedQuizScheme = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userID requierd'],
        unique: true
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    score: {
        type: Number,
        required: [true, 'score is requierd'],
        unique: false
    },
    dateTaken: {
        type: Date,
        required: [true, 'date is requierd'],
        unique: true
    },
    userAnswer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

const solevedQuiz = mongoose.model('SolevedQuiz', quizScheme);
model.exports = solevedQuiz;