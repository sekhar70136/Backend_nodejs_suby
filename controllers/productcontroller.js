const Product = require('../models/product');
const multer = require('multer');
const Firm = require('../models/Firm');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addProduct = async(req, res) => {
    try {
        const { productName, price,category,bestseller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId=req.params.firmId;
        const firm= await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({ message: 'Firm not found' });
        }
        const product= new Product({
            productName,
            price,
            category,
            bestseller,
            description,
            image,
            firm: firmId
        });  
        const savedproduct=await product.save();
          firm.products.push(savedproduct._id);
                  await firm.save();
        res.status(201).json(savedproduct);
    }
    catch (error) {
        console.error("Error in addProduct:", error.message, error.stack);
        res.status(500).json("internal server error")
    }
}

const getproductbyfirm=async(req,res)=>{
    try {
        const firmId=req.params.firmId;
        const firm= await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({ message: 'Firm not found' });
        }
        const products=await Product.find({firm:firmId});
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getproductbyfirm:", error.message, error.stack);
        res.status(500).json("internal server error")
    }
}

const deleteproductbyid=async(req,res)=>{
    try{
        const productid=req.params.productid;

        const deleteproduct=await Product.firmbyidanddelete(productid);

        if(!deleteproduct){
            return res.status(404).json({error:"no product found"})
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json("internal server error")
    }
}
module.exports = { addProduct :[upload.single('image'), addProduct] ,getproductbyfirm,deleteproductbyid}