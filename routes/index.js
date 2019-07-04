const router = require('express').Router();
const ctrl = require('../controllers');

router.get('/get-list', ctrl.getList);
router.post('/upload-file',  ctrl.uploadFile);
router.delete('/delete-file', ctrl.deleteFile);

module.exports = router;