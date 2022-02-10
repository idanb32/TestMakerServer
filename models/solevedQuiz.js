const container = require('../containerConfig')
const mongoose = container.resolve('mongoose')
const Schema = mongoose.Schema;


const solevedQuizScheme = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    score: {
        type: Number,
        required: [true, 'score is requierd']
    },
    dateTaken: {
        type: Date,
        required: [true, 'date is requierd']
    },
    userAnswer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

const solevedQuiz = mongoose.model('SolevedQuiz', solevedQuizScheme);
module.exports = solevedQuiz;