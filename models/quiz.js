
container = requrie('../containerConfig')
const mongoose = container.resole('mongoose')
const Schema = mongoose.Schema;


const quizScheme = new Schema({

    language: {
        type: String,
        required: [true, 'language is requierd']
    },
    testName:{
        type: String,
        required: [true, 'test name is requierd']
    },
    passingGrade:{
        type: Number,
        required: [true, 'passing Grade is requierd']
    },
    msgOnPassSubject:{
        type: String
    },
    msgOnPassBody:{
        type: String
    },
    msgOnFailSubject:{
        type: String
    },
    msgOnFailBody:{
        type: String
    },
    questions: [{
        questionid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    }],
    date: {
        type: Date,
        required: [true, 'date Of last Update requierd']
    }
});

const quiz = mongoose.model('Quiz', quizScheme);
model.exports = quiz;