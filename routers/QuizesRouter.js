const express = require('express');
const router = express.Router();

const QuizRep = require('../repostories/QuizRep');
const rep = new QuizRep();

router.post('/Add',async (req,res)=>{
    await rep.addQuizFromBody(req.body);
    res.send('Quiz has been added');
});
router.post('/Delete',async (req,res)=>{
    await rep.delQuizFromBody(req.body);
    res.send('Quiz has been deleted');
});
router.post('/Get',async (req,res)=>{
    let question =   await rep.getQuizFromBody(req.body);
    res.send(question);
});
router.get('/GetAll',async (req,res)=>{
   let allQuestions= await rep.getAllQuizes();
    res.send(allQuestions);
});
router.post('/Update',async (req,res)=>{
    await rep.updateQuizFromBody(req.body);
    res.send('Quiz has been updated');
});





module.exports = router;