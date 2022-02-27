const Subject = require('../models/subject');
const Question = require('../models/question');
const QuestionAnswers = require('../models/questionAnswers');
const Company = require('../models/company');
const container = require('../containerConfig');
const mongose = container.resolve('mongoose');



module.exports = class QuestionRep {
    async addQuestionFromBody(body) {
        await this.addQuestion(body.questionName, body.questionTags,
            body.questionAnswers, body.questionType,
            body.horizontal, body.textBelow, body.subject);
    }

    async updateQuestionFromBody(body) {
        await this.updateQuestionById(body.id,
            body.questionName, body.questionTags,
            body.questionAnswers, body.questionType,
            body.horizontal, body.textBelow, body.subject);
    }

    async getAllQuestionWithSubjectFromBody(body) {
        let res = await this.getAllQuestionWithSubject(body.subject);
        return res;
    }

    async DeleteFromBody(body) {
        console.log('got to deletefrom body')
        await this.DeleteThis(body.id);
    }

    async delQuestionFromBody(body) {
        await this.deleteQuestion(body.id);
    }

    async getQuestionFromBody(body) {
        let question = await this.getQuestionById(body.id);
        return question;
    }

    async searchFromBody(body) {
        console.log(body);
        let searchRes = await this.search(body.searchBy, body.searchText);
        return searchRes;
    }

    async addQuestion(questionName, questionTags,
        questionAnswers, questionType,
        horizontal, textBelow, subject) {
        let subId = await this.findOrCreateSubject(subject);
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
        await Question.updateOne({ _id: newQuestion._id },
            { questionAnswers: questionArray });

    }

    async addQuestionAnswers(questionAnswers, questionId) {
        let answerIdArr = [];
        for (const singleAnswer of questionAnswers) {
            let newAnswer = new QuestionAnswers({
                answer: singleAnswer.answer,
                question: questionId,
                IsCorrect: singleAnswer.IsCorrect
            });
            await newAnswer.save();
            answerIdArr.push(newAnswer._id);
        }
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
        let questionAnswersArr = await this.getAnswersByQuestionId(theQuestion.questionAnswers);
        let subjectOfQuestion = await this.getSubjectByQuestionId(theQuestion.subject);
        theQuestion.questionAnswers = questionAnswersArr;
        theQuestion.subject = subjectOfQuestion;
        return theQuestion;
    }

    async getSubjectByQuestionId(subjectId) {
        try {
            let subject = await Subject.findById(subjectId);
            return subject;
        }
        catch (err) {
            console.log(err);
        }
    }

    async getAnswersByQuestionId(questionAnswerIds) {
        let questionAnswersArr = [];
        try {
            for (let id of questionAnswerIds) {
                let questionAnswer = await QuestionAnswers.findById(id);
                questionAnswersArr.push(questionAnswer);
            }
        }
        catch (err) {
            console.log(err);
        }
        return questionAnswersArr;
    }

    async updateQuestionById(questionId, newQuestionName, newQuestionTags,
        questionAnswers, newQuestionType,
        newHorizontal, newTextBelow, subId) {
        await this.findAndDeleteAnswers(questionId);
        console.log(`passed the delete`);
        let questionAnswersArr = await this.addQuestionAnswers(questionAnswers, questionId);
        let subjectId = await this.findOrCreateSubject(subId);
        await Question.updateOne({ _id: questionId }, {
            questionName: newQuestionName,
            questionTags: newQuestionTags,
            questionAnswers: questionAnswersArr,
            questionType: newQuestionType,
            horizontal: newHorizontal,
            textBelow: newTextBelow,
            subject: subjectId
        });
    }

    async findAndDeleteAnswers(questionId) {
        await QuestionAnswers.deleteMany({ question: questionId });
    }

    async findOrCreateSubject(subject) {
        try {
            let foundSubject = await Subject.find({ subjectName: subject })
            if (foundSubject.length == 0) {
                let newSub = await this.addSubject(subject);
                return newSub._id;
            }
            return foundSubject[0]._id;

        }
        catch (err) {
            console.log(err);
        }
    }

    async getAllQuestion() {
        let questions = await Question.find();
        return questions;
    }

    async search(searchBy, searchText) {
        if (searchBy == "Name") {
            let theFoundedQuestion = await Question.find({ questionName: searchText });
            console.log("got into name " + theFoundedQuestion);
            return theFoundedQuestion;
        }
        else {
            let theFoundedQuestion = await Question.find({ questionTags: searchText });
            console.log(theFoundedQuestion);
            return theFoundedQuestion;
        }
    }

    async DeleteThis(id) {
        await this.findAndDeleteAnswers(id);
        await Question.deleteOne({ _id: id });
    }

    async getAllQuestionWithSubject(subject) {
        let subId = await Subject.find({ subjectName: subject })
        if (subId.length != 0) {
            let res = await Question.find({ subject: subId[0]._id });
        }
        let res = await Question.find({ subject: subId });
        console.log(res);
        return res;
    }

};