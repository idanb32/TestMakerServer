const Quiz = require('../models/quiz');
const SolvedQuiz = require('../models/solevedQuiz');
const container = require('../containerConfig');
const mongose = container.resolve('mongoose');
const QuestionAnswer = require('../models/questionAnswers');
const Question = require('../models/question');

module.exports = class solvedQuizRep {

    async addSolvedQuizFromBody(body) {
        await this.addSolvedQuiz(body.userid, body.testId,
            body.score,
            body.date, body.questions
        );
    }

    async updateSolvedQuizFromBody(body) {
        await this.updateSolvedQuiz(body.id, body.userid, body.testId,
            body.score,
            body.dateTaken, body.userAnswer)
    }
    async submitSolvedQuizFromBody(body) {
        let score = await this.submitSolvedQuiz(body.userId, body.quizId,
            body.answerArr, body.numOfQuestions);
        return score;
    }
    async delSolvedQuizFromBody(body) {
        await this.deleteSolvedQuiz(body.id);
    }

    async getSolvedQuizFromBody(body) {
        let solvedQuiz = await this.getSolvedQuizeById(body.id);
        return solvedQuiz;
    }

    async addSolvedQuiz(userId, quizId, score, date, questions
    ) {
        let newSolvedQuiz = new SolvedQuiz({
            userId: userId,
            testId: quizId,
            score: score,
            dateTaken: date,
            userAnswer: questions
        });
        await newSolvedQuiz.save();
    }

    async submitSolvedQuiz(userId, quizId, answerArr, numOfQuestions
    ) {
        let date = new Date(Date.now());
        let score = await this.checkScore(answerArr, numOfQuestions);
        let answers = this.formatAnswers(answerArr);
        let newSolvedQuiz = new SolvedQuiz({
            userId: userId,
            testId: quizId,
            score: score,
            dateTaken: date,
            userAnswer: answers
        });
        await newSolvedQuiz.save();
        return score;
    }

    formatAnswers(answerArr) {
        let tmp = [];
        for (let item of answerArr) {
            if (Array.isArray(item))
                tmp.push(...item);
            else
                tmp.push(item);
        }
        return tmp;
    }


    async deleteSolvedQuiz(id) {
        await SolvedQuiz.deleteOne({ _id: id });
    }

    async updateSolvedQuiz(id, userId, quizId, score, date, questionArr
    ) {

        await SolvedQuiz.updateOne({ _id: id }, {
            userId: userId,
            testId: quizId,
            score: score,
            dateTaken: date,
            userAnswer: questionArr
        });
    }

    async getSolvedQuizeById(id) {
        let theSolvedQuiz = await SolvedQuiz.findById(id);
        let answers = await this.getAnswers(theSolvedQuiz.userAnswer);
        theSolvedQuiz.userAnswer = answers;
        return theSolvedQuiz;
    }

    async getAllSolvedQuizes() {
        let SolvedQuizes = await SolvedQuiz.find();
        return SolvedQuizes;
    }

    async getAnswers(answerArr) {
        let tmp = [];
        for (let answer of answerArr) {
            let currrentAnswer = await QuestionAnswer.findById(answer);
            tmp.push(currrentAnswer);
        }
        return tmp;
    }

    async checkScore(answerArr, numOfQuestions) {
        let counterIsCorrect = 0;
        for (let answer of answerArr) {
            if (!Array.isArray(answer)) {
                let currrentAnswer = await QuestionAnswer.findById(answer);
                if (currrentAnswer !== null && currrentAnswer !== 'undefiend')
                    if (currrentAnswer.IsCorrect)
                        counterIsCorrect++;
            }
            else {
                counterIsCorrect += await this.checkScoreForMultiLineQuestion(answer);
            }
        }
        let score = parseFloat((counterIsCorrect / numOfQuestions) * 100);
        console.log(score);
        return score;
    }


    async checkScoreForMultiLineQuestion(answer) {
        if (answer.length == 0)
            return 0;
        let scoreForThisQuestion = 0.00;
        let answerToFindQuestion = await QuestionAnswer.findById(answer[0]);
        let question = await Question.findById(answerToFindQuestion.question);
        let correctAnswersOfQuestion = 0.00;
        for (let questionAnswer of question.questionAnswers) {
            let singleAnswerOfQuestion = await QuestionAnswer.findById(questionAnswer);
            if (singleAnswerOfQuestion !== null && singleAnswerOfQuestion !== 'undefiend')
                if (singleAnswerOfQuestion.IsCorrect)
                    correctAnswersOfQuestion++;
        }
        for (let oneAnswer of answer) {
            let currrentAnswer = await QuestionAnswer.findById(oneAnswer);
            if (currrentAnswer !== null && currrentAnswer !== 'undefiend')
                if (currrentAnswer.IsCorrect) {
                    scoreForThisQuestion++;
                }
        }
        let returnMe = parseFloat(scoreForThisQuestion / correctAnswersOfQuestion);
        return returnMe;
    }
}