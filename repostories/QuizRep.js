const Quiz = require('../models/quiz');
const Subject = require('../models/subject');
const Question = require('../models/question');
const container = require('../containerConfig');
const mongose = container.resolve('mongoose');



module.exports = class QuizRep {

    async addQuizFromBody(body) {
        await this.addQuiz(body.language, body.testName,
            body.passingGrade, body.msgOnPassSubject,
            body.msgOnPassBody, body.msgOnFailSubject,
            body.msgOnFailBody, body.questions,
            body.date, body.subjectOfStudying);
    }

    async updateQuizFromBody(body) {
        console.log(body);
        await this.updateQuiz(body.id, body.language, body.testName,
            body.passingGrade, body.msgOnPassSubject,
            body.msgOnPassBody, body.msgOnFailSubject,
            body.msgOnFailBody, body.questions,
            body.date, body.subjectOfStudying)
    }

    async delQuizFromBody(body) {
        await this.deleteQuiz(body.id);
    }

    async getQuizFromBody(body) {
      return  await this.getQuizeById(body.id);
    }

    async searchFromBody(body) {
        let result = await this.search(body.searchText, body.searchBy)
        return result;
    }

    async addQuiz(language, testName,
        passingGrade, msgOnPassSubject,
        msgOnPassBody, msgOnFailSubject,
        msgOnFailBody, questions,
        date, subjectOfStudying
    ) {
        let subId = await this.addSubject(subjectOfStudying);
        let newQuiz = new Quiz({
            language: language,
            testName: testName,
            passingGrade: passingGrade,
            msgOnPassSubject: msgOnPassSubject,
            msgOnPassBody: msgOnPassBody,
            msgOnFailSubject: msgOnFailSubject,
            msgOnFailBody: msgOnFailBody,
            questions: questions,
            date: date,
            subjectOfStudying: subId
        });
        await newQuiz.save();
    }

    async addSubject(subject) {
        let newSub = new Subject({
            subjectName: subject,
            companyId: "6205081a8f0948a7b51e215d",
        });
        await newSub.save();
        return newSub._id;
    }

    async deleteQuiz(id) {
        await Question.deleteOne({ _id: id });
    }

    async updateQuiz(id, language, testName,
        passingGrade, msgOnPassSubject,
        msgOnPassBody, msgOnFailSubject,
        msgOnFailBody, questions,
        date, subjectOfStudying
    ) {

        await Quiz.updateOne({ _id: id }, {
            language: language,
            testName: testName,
            passingGrade: passingGrade,
            msgOnPassSubject: msgOnPassSubject,
            msgOnPassBody: msgOnPassBody,
            msgOnFailSubject: msgOnFailSubject,
            msgOnFailBody: msgOnFailBody,
            questions: questions,
            date: date,
            subjectOfStudying: subjectOfStudying
        });
    }

    async getQuizeById(id) {
        let theQuiz = await Quiz.findById(id);
        return theQuiz;
    }

    async getQuizWithQustion(id){
        let theQuiz = await Quiz.findById(id);
        let tmp =[];
        for (let questionId of theQuiz.questions){
            let question = await Question.findById(questionId);
            tmp.push(question);
        }
        theQuiz.questions = tmp;
        return theQuiz;
    }

    async getAllQuizes() {
        let Quizes = await Quiz.find();
        return Quizes;
    }

    async search(text, searchBy) {
        if (searchBy == "Name") {
            let result = await Quiz.find({ testName: text });
            return result
        }
        else{
            let result = await Quiz.find({ language: text });
            return result
        }
    }
}