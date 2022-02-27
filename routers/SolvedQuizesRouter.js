const express = require('express');
const router = express.Router();



const container = require('../repContainer');
const rep = container.resolve('SolvedQuizRep');

router.post('/Add', async (req, res) => {
    await rep.addSolvedQuizFromBody(req.body);
    res.send('SolvedQuiz has been added');
});
router.post('/Delete', async (req, res) => {
    await rep.delSolvedQuizFromBody(req.body);
    res.send('SolvedQuiz has been deleted');
});
router.post('/Get', async (req, res) => {
    let solvedQuiz = await rep.getSolvedQuizFromBody(req.body);
    res.send(solvedQuiz);
});
router.get('/GetAll', async (req, res) => {
    let allSolvedQuizes = await rep.getAllSolvedQuizes();
    res.send(allSolvedQuizes);
});
router.post('/GetAllWithUserName', async (req, res) => {
    let allSolvedQuizes = await rep.getAllSolvedQuizesWithUserNameFromBody(req.body);
    res.send(allSolvedQuizes);
});
router.post('/Update', async (req, res) => {
    await rep.updateSolvedQuizFromBody(req.body);
    res.send('solvedQuiz has been updated');
});

router.post('/Submit', async (req, res) => {
    let score = await rep.submitSolvedQuizFromBody(req.body);
    res.send(`${score}`);
});

router.post('/GetSolvedOfQuiz', async (req,res)=>{
    let solvedQuizes = await rep.getSolvedQuizOfQuizByBody(req.body);
    res.send(solvedQuizes);
});


module.exports = router;