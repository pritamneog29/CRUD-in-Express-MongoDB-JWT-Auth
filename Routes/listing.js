const express = require('express');
const router = express.Router();
const listController = require('../controllers/listing');
router.get('/', listController.getAll);
router.post('/', listController.create);
router.get('/:id', listController.getById);
router.put('/:id', listController.updateById);
router.delete('/:id', listController.deleteById);
module.exports = router;