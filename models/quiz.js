const container = require('../containerConfig')
const mongoose = container.resolve('mongoose')
const Schema = mongoose.Schema;


const quizScheme = new Schema({

    language: {
        type: String,
        required: [true, 'language is requierd']
    },
    testName: {
        type: String,
        required: [true, 'test name is requierd']
    },
    passingGrade: {
        type: Number,
        required: [true, 'passing Grade is requierd']
    },
    msgOnPassSubject: {
        type: String
    },
    msgOnPassBody: {
        type: String
    },
    msgOnFailSubject: {
        type: String
    },
    msgOnFailBody: {
        type: String
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    date: {
        type: Date,
        required: [true, 'date Of last Update requierd']
    },
    subjectOfStudying: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }
});

const quiz = mongoose.model('Quiz', quizScheme);
module.exports = quiz;