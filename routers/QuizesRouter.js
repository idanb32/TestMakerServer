const express = require('express');
const router = express.Router();

const container = require('../repContainer');
const rep = container.resolve('QuizRep');

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

router.post('/search', async(req,res)=>{
    let searchRes = await rep.searchFromBody(req.body);
    res.send(searchRes);
});
router.post('/searchBySubject', async(req,res)=>{
    let searchRes = await rep.searchBySubjectFromBody(req.body);
    res.send(searchRes);
});

router.post('/getWithQuestion',async (req,res)=>{
    console.log(`got to get with question`)
    let quiz = await rep.getQuizWithQustion(req.body.id);
    res.send(quiz);
});



module.exports = router;