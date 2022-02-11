const express = require('express');
const router = express.Router();


const SolvedQuizRep = require('../repostories/SolvedQuizRep');
const rep = new SolvedQuizRep();


router.post('/Add',async (req,res)=>{
    await rep.addSolvedQuizFromBody(req.body);
    res.send('SolvedQuiz has been added');
});
router.post('/Delete',async (req,res)=>{
    await rep.delSolvedQuizFromBody(req.body);
    res.send('SolvedQuiz has been deleted');
});
router.post('/Get',async (req,res)=>{
    let solvedQuiz =   await rep.getSolvedQuizFromBody(req.body);
    res.send(solvedQuiz);
});
router.get('/GetAll',async (req,res)=>{
   let allSolvedQuizes = await rep.getAllSolvedQuizes();
    res.send(allSolvedQuizes);
});
router.post('/Update',async (req,res)=>{
    await rep.updateSolvedQuizFromBody(req.body);
    res.send('solvedQuiz has been updated');
});


module.exports = router;