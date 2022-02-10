const Quiz = require('../models/quiz');
const SolvedQuiz = require('../models/solevedQuiz');
const container = require('../containerConfig');
const mongose = container.resolve('mongoose');



module.exports = class solvedQuizRep {

    async addSolvedQuizRep(body){
        await this.addSolvedQuiz(body.userid, body.testId,
            body.score, 
            body.date, body.questions
           );
    }

    async updateSolvedQuizFromBody(body){
        await this.updateSolvedQuiz(id,body.userid, body.testId,
            body.score, 
            body.date, body.questions)
    }

    async delSolvedQuizFromBody(body){
        await this.deleteSolvedQuiz(body.id);
    }

    async getSolvedQuizFromBody(body){
        await this.getSolvedQuizeById(body.id);
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