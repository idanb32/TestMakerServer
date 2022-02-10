const Subject = require('../models/subject');
const Question = require('../models/question');
const QuestionAnswers = require('../models/questionAnswers');
const Company = require('../models/company');
const container = require('../containerConfig');
const mongose = container.resolve('mongoose');



module.exports = class QuestionRep {
    async addQuestionFromBody(body){
        await this.addQuestion(body.questionName,body.questionTags,
            body.questionAnswers, body.questionType,
            body.horizontal, body.textBelow, body.subject);
    }
    async updateQuestionFromBody(body){
        await this.updateQuestionById(body.id,
            body.questionName,body.questionTags,
            body.questionAnswers, body.questionType,
            body.horizontal, body.textBelow, body.subject);
    }
    async delQuestionFromBody(body){
        await this.deleteQuestion(body.id);
    }
    async getQuestionFromBody(body){
      let question =   await this.getQuestionById(body.id);
      return question;
    }

    async addQuestion(questionName, questionTags,
        questionAnswers, questionType,
        horizontal, textBelow, subject) {
        let subId = await this.addSubject(subject);
        let newQuestion = new Question({
            questionName: questionName,
            questionTags: questionTags,
            questionAnswers: null,
            questionType: questionType,
            horizontal: horizontal,
            textBelow: textBelow,
            subject: subId
        });
        await newQuestion.save();
        let questionArray = await this.addQuestionAnswers(questionAnswers, newQuestion._id);
        await Question.updateOne({ _id : newQuestion._id },
            { questionAnswers: questionArray });

    }
    async addQuestionAnswers(questionAnswers, questionId) {
        let answerIdArr = [];
        for (const singleAnswer of questionAnswers){
            let newAnswer = new QuestionAnswers({
                answer: singleAnswer.answer,
                question: questionId,
                IsCorrect: singleAnswer.IsCorrect
            });
            await newAnswer.save();
            console.log('newAnswer._id');
            answerIdArr.push(newAnswer._id);
        }
        console.log('finished getting id')
        return answerIdArr;
    }
    async addSubject(subject) {
        let newSub = new Subject({
            subjectName: subject,
            companyId: "6205081a8f0948a7b51e215d",
        });
        await newSub.save();
        return newSub._id;
    }
    async deleteQuestion(questionId) {
        await Question.deleteOne({ _id: questionId });
    }
    async getQuestionById(questionId) {
        let theQuestion = await Question.findById(questionId);
        return theQuestion;
    }
    async updateQuestionById(questionId, questionName, questionTags,
        questionAnswers, questionType,
        horizontal, textBelow, subId) {
        await Question.updateOne({ _id: questionId }, {
            questionName: questionName,
            questionTags: questionTags,
            questionAnswers: questionAnswers,
            questionType: questionType,
            horizontal: horizontal,
            textBelow: textBelow,
            subject: subId
        });
    }
    async getAllQuestion(){
        let questions = await Question.find();
        return questions;
    }




};