const express = require('express');
const router = express.Router();
const logger = require('../config/logger');


const container = require('../repContainer');
const rep = container.resolve('SolvedQuizRep');

router.post('/Add', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.addSolvedQuizFromBody(req.body);
        res.send('SolvedQuiz has been added');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Delete', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.delSolvedQuizFromBody(req.body);
        res.send('SolvedQuiz has been deleted');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Get', async (req, res) => {
    logger.info(req.body);
    try {
        let solvedQuiz = await rep.getSolvedQuizFromBody(req.body);
        res.send(solvedQuiz);
    }
    catch (err) {
        logger.error(err);
    }
});
router.get('/GetAll', async (req, res) => {
    logger.info(req.body);
    try {
        let allSolvedQuizes = await rep.getAllSolvedQuizes();
        res.send(allSolvedQuizes);
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/GetAllWithUserName', async (req, res) => {
    logger.info(req.body);
    try {
        let allSolvedQuizes = await rep.getAllSolvedQuizesWithUserNameFromBody(req.body);
        res.send(allSolvedQuizes);
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Update', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.updateSolvedQuizFromBody(req.body);
        res.send('solvedQuiz has been updated');
    }
    catch (err) {
        logger.error(err);
    }
});

router.post('/Submit', async (req, res) => {
    logger.info(req.body);
    try {
        let score = await rep.submitSolvedQuizFromBody(req.body);
        res.send(`${score}`);
    }
    catch (err) {
        logger.error(err);
    }
});

router.post('/GetSolvedOfQuiz', async (req, res) => {
    logger.info(req.body);
    try {
        let solvedQuizes = await rep.getSolvedQuizOfQuizByBody(req.body);
        res.send(solvedQuizes);
    }
    catch (err) {
        logger.error(err);
    }
});


module.exports = router;