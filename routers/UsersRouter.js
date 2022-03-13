const express = require('express');
const router = express.Router();
const logger = require('../config/logger');

const container = require('../repContainer');
const rep = container.resolve('UserRep');


router.post('/Add', async (req, res) => {
    logger.info(req.body);
    try {
        let user = await rep.addUserRep(req.body);
        res.send(user);
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/GetLogin', async (req, res) => {
    logger.info(req.body);
    try {
        let user = await rep.getUserLogin(req.body);
        res.send(user);
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Delete', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.delUserFromBody(req.body);
        res.send('User has been deleted');
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Get', async (req, res) => {
    logger.info(req.body);
    try {
        let user = await rep.getUserFromBody(req.body);
        res.send(user);
    }
    catch (err) {
        logger.error(err);
    }
});
router.get('/GetAll', async (req, res) => {
    logger.info(req.body);
    try {
        let allUsers = await rep.getAllUsers();
        res.send(allUsers);
    }
    catch (err) {
        logger.error(err);
    }
});
router.post('/Update', async (req, res) => {
    logger.info(req.body);
    try {
        await rep.updateUserFromBody(req.body);
        res.send('User has been updated');
    }
    catch (err) {
        logger.error(err);
    }
});


module.exports = router;