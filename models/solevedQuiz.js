
container = requrie('../containerConfig')
const mongoose = container.resole('mongoose')
const Schema = mongoose.Schema;


const solevedQuizScheme = new Schema({

    userId : {
    type: {
        userId :{
            type: mongoose.Schema.Types.ObjectId,
                ref :'User'
        }
    },
    required :[true,'userID requierd'],
    unique : true
    },
    testId :
    {
        type: {
            testId :{
                type: mongoose.Schema.Types.ObjectId,
                    ref :'Quiz'
            }
        },

    },
    score :
    {
        type: Number,
        required :[true,'score is requierd'],
        unique : false
    },
    dateTaken : 
    {
        type: DateTime,
        required :[true,'date is requierd'],
        unique : true

    },
    userAnswer :
    {
        
        type:[ {
            testId :{
                type: mongoose.Schema.Types.ObjectId,
                    ref :'Question'
            },
           
        }],
        required :[true,'date is requierd'],
        unique : true

    }


})

const quiz =  mongoose.model('quiz',quizScheme)
model.exports = quiz;