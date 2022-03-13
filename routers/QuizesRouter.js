const express = require('express');
const router = express.Router();
const logger = require('../config/logger');
const container = require('../repContainer');
const rep = container.resolve('QuizRep');

router.post('/Add', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.addQuizFromBody(req.body);
        res.send('Quiz has been added');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Delete', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.delQuizFromBody(req.body);
        res.send('Quiz has been deleted');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Get', async (req, res) => {
    logger.info(req.body);
    try {
        let question = await rep.getQuizFromBody(req.body);
        res.send(question);
    }
    catch (err) {
        logger.error(err);
    }
});
router.get('/GetAll', async (req, res) => {
    logger.info(req.body);
    try {
        let allQuestions = await rep.getAllQuizes();
        res.send(allQuestions);
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Update', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.updateQuizFromBody(req.body);
        res.send('Quiz has been updated');
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
router.post('/searchBySubject', async (req, res) => {
    logger.info(req.body);
    try {
        let searchRes = await rep.searchBySubjectFromBody(req.body);
        res.send(searchRes);
    }
    catch (err) {
        logger.error(err);
    }
});

router.post('/getWithQuestion', async (req, res) => {
    logger.info(req.body);
    try {
        let quiz = await rep.getQuizWithQustion(req.body.id);
        res.send(quiz);
    }
    catch (err) {
        logger.error(err);
    }
});

router.post('/GetQuizQuestion', async (req, res) => {
    logger.info(req.body);
    try {
        let questions = await rep.GetQuizQuestion(req.body.id);
        res.send(questions);
    }
    catch (err) {
        logger.error(err);
    }
})
router.post('/getallSubject', async (req, res) => {
    logger.info(req.body);
    try {
        let questions = await rep.getQuizesWithSubject(req.body.subject);
        res.send(questions);
    }
    catch (err) {
        logger.error(err);
    }
});

module.exports = router;