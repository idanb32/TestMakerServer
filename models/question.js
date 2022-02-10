const container = require('../containerConfig');
const mongoose = container.resolve('mongoose');
const Scheme  = mongoose.Schema;


const questionScheme = new Scheme({

    questionName:{
        type: String,
        require:  [true, 'question name is required']
    },
    questionTags:{
        type: Array, "default" : []
    },
    questionAnswers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'QuestionAnswers'
    }],
    questionType:{
        type: String,
        enum : ['singleAnswer','multiAnswer'],
        default: 'singleAnswer'
    },
    horizontal:{
        type: Boolean
    },
    textBelow:{
        type:String
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Subject'
    }

});



const Question = mongoose.model('Question',questionScheme);
module.exports = Question;
