const express = require('express');
const getWines = require('./getwines');
const postWine = require('./postWine');
const deleteWine = require('./deleteWine');
const patchWine = require('./patchWine');

const router = express.Router();

router.use(getWines);
router.use(postWine);
router.use(deleteWine);
router.use(patchWine);

module.exports = router;
