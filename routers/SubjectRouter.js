const express = require('express');
const router = express.Router();
const logger = require('../config/logger');

const container = require('../repContainer');
const rep = container.resolve('SubjectRep');


router.post('/Add', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.addSubject(req.body);
        res.send('Subject has been added');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Delete', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.delSubjectFromBody(req.body);
        res.send('Subject has been deleted');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Get', async (req, res) => {
    logger.info(req.body);
    try {
        let Company = await rep.getSubjectFromBody(req.body);
        res.send(Company);
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/GetByCompanyId', async (req, res) => {
    logger.info(req.body);
    try {
        let Company = await rep.getSubjectsByCompanyFromBody(req.body);
        res.send(Company);
    }
    catch (err) {
        logger.error(err);
    }
});

router.get('/GetAll', async (req, res) => {
    logger.info(req.body);
    try {
        let Companyies = await rep.getAllSubject();
        res.send(Companyies);
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Update', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.updateSubjectFromBody(req.body);
        res.send('Subject has been updated');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/GetSubjectByName', async (req, res) => {
    logger.info(req.body);
    try {
        let subject = await rep.getSubjectNameBody(req.body);
        res.send(subject);
    }
    catch (err) {
        logger.error(err);
    }
});


module.exports = router;