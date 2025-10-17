const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async(req, res) => {
    try {
        const { firmname, area, category, region, offer } = req.body;

        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
           return res.status(404).json({ message: "Vendor not found" })
        }

       

        const firm = new Firm({
            firmname,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        })

        const savedFirm = await firm.save();
        console.log("Saved Firm:", savedFirm);

        const firmId = savedFirm._id
        const vendorFirmName = savedFirm.firmName

        vendor.firms.push(savedFirm._id)

        await vendor.save()



        return res.status(200).json({ message: 'Firm Added successfully ', firmId, vendorFirmName });


    } catch (error) {
       console.error("Error in addFirm:", error.message, error.stack);
        res.status(500).json("intenal server error")
    }
}

const deletefirmbyid=async(req,res)=>{
    try{
        const productid=req.params.firmid;

        const deleteproduct=await Firm.firmbyidanddelete(firmid);

        if(!deleteproduct){
            return res.status(404).json({error:"no product found"})
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json("internal server error")
    }
}

module.exports = { addFirm: [upload.single('image'), addFirm] ,deletefirmbyid}
