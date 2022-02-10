const Company = require('./Company');
const Question = require('./Question');
const QuestionAnswers = require('./QuestionAnswers');
const User = require('./User');
init=()=>{

    let company = new company{(
        companyName ="tomerWorld"
    )};
    company.save()
    .then ((res)=>console.log(res));

    let questions = new Question{(

        questionName = "somethingSomethin",
        questionTags = [],
        questionAnswers = null,
        questionType = 'singleAnswer',
        horizontal = true,
        textBelow ="somethingSomethinsomethingSomethinsomethingSomethin",
        subject = null
    )};
    questions.save()
    .then ((res)=>console.log(res));


    let questionAnswers = new QuestionAnswers{(
        answer ='answer',
        question = null,
        isCorrect =true
    )};

    questionAnswers.save()
    .then ((res)=>console.log(res));

    let user = new User{(
        userName = "tomer",
        userPassword = "12345",
        emailAdress = "mosav 6",
        companyID = null,
        userRole = "Admin"
    )};
    user.save()
    .then ((res)=>console.log(res));


}