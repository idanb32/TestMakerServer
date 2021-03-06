const Quiz = require('../models/quiz');
const Subject = require('../models/subject');
const Question = require('../models/question');
const container = require('../containerConfig');
const QuestionAnswers = require('../models/questionAnswers');
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
        return await this.getQuizeById(body.id);
    }

    async searchBySubjectFromBody(body) {
        let result = await this.searchBySubjcet(body.subjectId)
        return result;
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
        //let subId = await this.findOrAddSubject(subjectOfStudying);
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
            subjectOfStudying: subjectOfStudying
        });
        await newQuiz.save();
    }

    async findOrAddSubject(subject) {
        try {
            let foundSubject = await Subject.find({ subjectName: subject });
            if (foundSubject.length == 0) {
                let newSub = await this.addSubject(subject);
                return newSub._id;
            }
            return foundSubject._id;
        }
        catch (err) {
            console.log(err);
        }
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
        await Quiz.deleteOne({ _id: id });
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

    async getQuizWithQustion(id) {
        let theQuiz = await Quiz.findById(id);

        let tmp = [];
        for (let questionId of theQuiz.questions) {
            let question = await Question.findById(questionId);
            let tmp2 = [];
            for (let answerId of question.questionAnswers) {
                let answer = await QuestionAnswers.findById(answerId);
                tmp2.push(answer);
            }
            question.questionAnswers = tmp2;
            tmp.push(question);
        }
        theQuiz.questions = tmp;
        return theQuiz;
    }

    async getAllQuizes() {
        let Quizes = await Quiz.find();
        return Quizes;
    }
    async searchBySubjcet(subjectId) {

        let Quizes = await Quiz.find({ subjectOfStudying: subjectId });
        return Quizes;
    }

    async getQuizesWithSubject(subject){
        let subId = await Subject.find({ subjectName: subject })
        if (subId.length != 0) {
            let res = await Quiz.find({ subjectOfStudying: subId[0]._id });
             console.log(res);
            return res;
        }
        let res = await Quiz.find({ subjectOfStudying: subId });
        return res;
    }


    async search(text, searchBy) {
        if (searchBy == "Name") {
            let result = await Quiz.find({ testName: text });
            return result
        }
        else {
            let result = await Quiz.find({ language: text });
            return result
        }
    }

    async GetQuizQuestion(id) {
        let theQuiz = await Quiz.findById(id);
        let tmp = [];
        for (let questionId of theQuiz.questions) {
            let question = await Question.findById(questionId);
            console.log(question)
            if (question) {
                let tmp2 = {
                    id: question._id,
                    questionName: question.questionName
                };
                tmp.push(tmp2);
            }
        }
        return tmp;
    }

}