const Quiz = require('../models/quiz');
const SolvedQuiz = require('../models/solevedQuiz');
const container = require('../containerConfig');
const mongose = container.resolve('mongoose');
const QuestionAnswer = require('../models/quiz');
const Question =require('../models/question');

module.exports = class solvedQuizRep {

    async addSolvedQuizFromBody(body){
        await this.addSolvedQuiz(body.userid, body.testId,
            body.score, 
            body.date, body.questions
           );
    }

    async updateSolvedQuizFromBody(body){
        await this.updateSolvedQuiz(body.id,body.userid, body.testId,
            body.score, 
            body.dateTaken, body.userAnswer)
    }

    async delSolvedQuizFromBody(body){
        await this.deleteSolvedQuiz(body.id);
    }

    async getSolvedQuizFromBody(body){
        let solvedQuiz =  await this.getSolvedQuizeById(body.id);
        return solvedQuiz;
    }    

    async addSolvedQuiz(userId,quizId,answerArr
    ) {
        let date = new Date(Date.now());
        let score = await this.checkScore(answerArr);
        let newSolvedQuiz = new SolvedQuiz({
            userId:userId,
            testId:quizId,
            score:score,
            dateTaken:date,
            userAnswer:answerArr
        });
        await newSolvedQuiz.save();
    }
    

    async deleteSolvedQuiz(id){
        await SolvedQuiz.deleteOne({ _id: id });
    }

    async updateSolvedQuiz(id,userId,quizId,score,date,questionArr
    ) {
        
        await SolvedQuiz.updateOne({_id:id},{
            userId:userId,
            testId:quizId,
            score:score,
            dateTaken:date,
            userAnswer:questionArr
        });
    }

    async getSolvedQuizeById(id) {
        let theSolvedQuiz = await SolvedQuiz.findById(id);
        let answers = await this.getAnswers(theSolvedQuiz.userAnswer);
        theSolvedQuiz.userAnswer = answers;
        return theSolvedQuiz;
    }

    async getAllSolvedQuizes(){
        let SolvedQuizes = await SolvedQuiz.find();
        return SolvedQuizes;
    }

    async getAnswers(answerArr){
        let tmp=[];
        for(let answer of answerArr){
            let currrentAnswer = await QuestionAnswer.findById(answer);
            tmp.push(currrentAnswer);
        }
        return tmp;
    }

    async checkScore(answerArr){
        let counterIsCorrect=0;
        for(let answer of answerArr){
            let currrentAnswer = await QuestionAnswer.findById(answer);
            if(currrentAnswer.IsCorrect)
            counterIsCorrect++;
        }
        let score = parseFloat((counterIsCorrect/answerArr.length)*100);
        return score;
    }
}