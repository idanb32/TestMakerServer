const container = require('./containerConfig');
const awilix = require('awilix');
const companyRep = require('./repostories/CompanyRep');
const questionRep = require('./repostories/QuestionRep');
const quizRep = require('./repostories/QuizRep');
const solvedQuizRep = require('./repostories/SolvedQuizRep');
const userRep = require('./repostories/UserRep');
const SubjectRep = require('./repostories/SubjectRep');




container.register({
    SubjectRep : awilix.asClass(SubjectRep).singleton(),

    CompanyRep : awilix.asClass(companyRep).singleton(),
    QuestionRep : awilix.asClass(questionRep).singleton(),
    QuizRep : awilix.asClass(quizRep).singleton(),
    SolvedQuizRep : awilix.asClass(solvedQuizRep).singleton(),
    UserRep : awilix.asClass(userRep).singleton()
})
module.exports = container;