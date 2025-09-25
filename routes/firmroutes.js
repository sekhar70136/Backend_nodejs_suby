const express = require('express');
const firmController = require('../controllers/firmcontroller');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router()

router.post('/add-firm', verifyToken, firmController.addFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmid',firmController.deletefirmbyid);


module.exports = router;