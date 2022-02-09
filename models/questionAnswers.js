const container = require('../containerConfig');
const mongoose = container.resolve('mongoose');
const Scheme  = mongoose.Schema;

const questionAnswersScheme = new Scheme({
    answer:{
        type:String
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    IsCorrect:{
        type:Boolean
    }
});


const QuestionAnswers = mongoose.model('QuestionAnswers',questionAnswersScheme);
module.exports = QuestionAnswers;