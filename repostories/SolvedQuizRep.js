const Quiz = require('../models/quiz');
const SolvedQuiz = require('../models/solevedQuiz');
const container = require('../containerConfig');
const mongose = container.resolve('mongoose');



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

    async addSolvedQuiz(userId,quizId,score,date,questionArr
    ) {
        
        let newSolvedQuiz = new SolvedQuiz({
            userId:userId,
            testId:quizId,
            score:score,
            dateTaken:date,
            userAnswer:questionArr
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
        return theSolvedQuiz;
    }

    async getAllSolvedQuizes(){
        let SolvedQuizes = await SolvedQuiz.find();
        return SolvedQuizes;
    }
}