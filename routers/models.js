const Company = require('../models/company');
const Question = require('../models/question');
const QuestionAnswers = require('../models/questionAnswers');
const User = require('../models/user');
const quiz = require('../models/quiz');
const solvedQuiz = require('../models/solevedQuiz');
const Subject = require('../models/subject');
const container = require ('../containerConfig');

const mongose = container.resolve("mongoose");



module.exports = init = async () => {
    let company = new Company({
        companyName :"tomerWorld"
    });
     try{ 
        await company.save();
        console.log(company);
    }
    catch(err){
        console.log(err);
    }
    

    let user = new User({
        userName : "tomer",
        userPassword : "12345",
        emailAdress : "mosav 6",
        companyID : company._id,
        userRole : "Admin"
    });
    await user.save();
    console.log(user);

    let subject = new Subject({
        subjectName: "newSub",
        companyId: company._id,
    });
    await subject.save();
    console.log(subject);

    let questions1 = new Question({
        questionName : "somethingSomethin",
        questionTags :["sd","ds"],
        questionAnswers : null,
        questionType : 'singleAnswer',
        horizontal : true,
        textBelow : "somethingSomethinsomethingSomethinsomethingSomethin",
        subject : subject._id
    });
    await questions1.save();
    console.log(questions1);
    let questions2 = new Question({
        questionName : "somethingSomethin",
        questionTags :["sd","ds"],
        questionAnswers : null,
        questionType : 'singleAnswer',
        horizontal : true,
        textBelow :"somethingSomethinsomethingSomethinsomethingSomethin",
        subject : subject._id
    });
    await questions2.save()
    console.log(questions2);
    let questionAnswer1 = new QuestionAnswers({
        answer :'answer',
        question : questions1._id,
        isCorrect :true
    });
    await questionAnswer1.save();
    console.log(questionAnswer1);
    let questionAnswer2 = new QuestionAnswers({
        answer :'answer',
        question : questions1._id,
        isCorrect :true
    });
    await questionAnswer2.save()
    console.log(questionAnswer2);

    let questionArr = [questions1._id, questions2._id];
    let answerArr = [questionAnswer2._id, questionAnswer1._id];

    let makeQuiz = new quiz({
        language: "english",
        testName: "js test",
        passingGrade: 90,
        msgOnPassSubject: "pass",
        msgOnPassBody: "pass body",
        msgOnFailSubject: "fail",
        msgOnFailBody: "fail body",
        questions: questionArr,
        date: Date.now(),
        subjectOfStudying: subject._id
    });
    await makeQuiz.save()
    console.log(makeQuiz);
    let makeSolvedQuiz = new solvedQuiz({
        userId: user._id,
        testId: makeQuiz._id,
        score: 80,
        dateTaken: Date.now(),
        userAnswer: answerArr
    });
    await makeSolvedQuiz.save();
    console.log(makeSolvedQuiz);
}