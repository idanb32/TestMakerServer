const express = require('express');
const router = express.Router();
const logger = require('../config/logger');

const container = require('../repContainer');
const rep = container.resolve('CompanyRep');


router.post('/Add', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.addCompanyRep(req.body);
        res.send('Company has been added');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Delete', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.delCompanyFromBody(req.body);
        res.send('Company has been deleted');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Get', async (req, res) => {
    logger.info(req.body);
    try {
        let company = await rep.getCompanyFromBody(req.body);
        res.send(company);
    }
    catch (err) {
        logger.error(err);
    }
});
router.get('/GetAll', async (req, res) => {
    logger.info(req.body);
    try {
        let allCompany = await rep.getAllCompany();
        res.send(allCompany);
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Update', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.updateCompanyBody(req.body);
        res.send('Company has been updated');
    }
    catch (err) {
        logger.error(err);
    }
});


module.exports = router;