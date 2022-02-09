
container = requrie('../containerConfig')
const mongoose = container.resole('mongoose')
const Schema = mongoose.Schema;


const quizScheme = new Schema({

    language : {
    type: String,
    required :[true,'language is requierd'],
    unique : true
    },
    testName :
    {
        type: String,
        required : [true,'test name is requierd'],
        unique : true

    },
    passingGrade :
    {
        type: Number,
        required :[true,'passing Grade is requierd'],
        unique : false
    },
    msgOnPass : 
    {
        type: Msg,
        required :[true,'language is requierd'],
        unique : true

    },
    msgOnFail : 
    {
        type: Object,
        required :[true,'language is requierd'],
        unique : true

    },
    questions : 
    {
        type : {
            questionid :{
                type: mongoose.Schema.Types.ObjectId,
                ref :'Question'
            }
        },
        required :[false],
        unique : false

    },
    date : 
    {
        type : DateTime,
        required :[true,'date Of last Update requierd'],
        unique : false,
 
    }


})

const quiz =  mongoose.model('Quiz',quizScheme)
model.exports = quiz;