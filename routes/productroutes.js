const express = require('express');
const productcontroller= require('../controllers/productcontroller');
const router = express.Router();

router.post('/addproduct/:firmId', productcontroller.addProduct);

router.get('/getproducts/:firmId', productcontroller.getproductbyfirm);

router.get('/:firmId/products',productcontroller.getproductbyfirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:productid',productcontroller.deleteproductbyid);

module.exports = router;