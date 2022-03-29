const express = require('express');
const router = express.Router();

const siteController = require('../app/controller/SiteController');

router.post('/create', siteController.create)
router.put('/update/:id', siteController.update)
router.get('/', siteController.index);

module.exports = router;