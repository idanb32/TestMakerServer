
container = requrie('../containerConfig')
const mongoose = container.resole('mongoose')
const Schema = mongoose.Schema;


const quizScheme = new Schema({

    language: {
        type: String,
        required: [true, 'language is requierd'],
        unique: true
    },
    testName:{
        type: String,
        required: [true, 'test name is requierd'],
        unique: true

    },
    passingGrade:{
        type: Number,
        required: [true, 'passing Grade is requierd'],
        unique: false
    },
    msgOnPass:{
        type: String,
        required: [true, 'pass messege is requierd'],
        unique: false

    },
    msgOnFail:{
        type: String,
        required: [true, 'fail messege is requierd'],
        unique: false

    },
    questions: [{
        questionid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    }],
    date: {
        type: Date,
        required: [true, 'date Of last Update requierd'],
        unique: false,
    }
});

const quiz = mongoose.model('Quiz', quizScheme);
model.exports = quiz;