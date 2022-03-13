const express = require('express');
const router = express.Router();
const logger = require('../config/logger');

const container = require('../repContainer');
const rep = container.resolve('QuestionRep');

router.post('/Add', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.addQuestionFromBody(req.body);
        res.send('question has been added');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Delete', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.delQuestionFromBody(req.body);
        res.send('question has been deleted');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Get', async (req, res) => {
    logger.info(req.body);
    try {
        let question = await rep.getQuestionFromBody(req.body);
        res.send(question);
    }
    catch (err) {
        logger.error(err);
    }
});
router.get('/GetAll', async (req, res) => {
    logger.info(req.body);
    try {
        let allQuestions = await rep.getAllQuestion();
        res.send(allQuestions);
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Update', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.updateQuestionFromBody(req.body);
        res.send('question has been updated');
    }
    catch (err) {
        logger.error(err);
    }
});

router.post('/search', async (req, res) => {
    logger.info(req.body);
    try {
        let searchRes = await rep.searchFromBody(req.body);
        res.send(searchRes);
    }
    catch (err) {
        logger.error(err);
    }
});

router.post('/Delete', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.DeleteFromBody(req.body);
        res.send('Question was deleted');
    }
    catch (err) {
        logger.error(err);
    }
});

router.post('/getallSubject', async (req, res) => {
    logger.info(req.body);
    try {
        let allQuestions = await rep.getAllQuestionWithSubjectFromBody(req.body);
        res.send(allQuestions);
    }
    catch (err) {
        logger.error(err);
    }
});


module.exports = router;