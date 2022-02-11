const express = require('express');
const router = express.Router();

const container = require('../repContainer');
const rep = container.resolve('QuestionRep');

router.post('/Add',async (req,res)=>{
    await rep.addQuestionFromBody(req.body);
    res.send('question has been added');
});
router.post('/Delete',async (req,res)=>{
    await rep.delQuestionFromBody(req.body);
    res.send('question has been deleted');
});
router.post('/Get',async (req,res)=>{
    let question =   await rep.getQuestionFromBody(req.body);
    res.send(question);
});
router.get('/GetAll',async (req,res)=>{
   let allQuestions= await rep.getAllQuestion();
    res.send(allQuestions);
});
router.post('/Update',async (req,res)=>{
    await rep.updateQuestionFromBody(req.body);
    res.send('question has been updated');
});



module.exports = router;