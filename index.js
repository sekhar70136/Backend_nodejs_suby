const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorroutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmroutes');
const productroutes = require('./routes/productroutes');    
const path=require('path')

require("dotenv").config();

const app = express()

const PORT = process.env.PORT || 4000;

dotEnv.config();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(error))

app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productroutes);
app.use('/uploads',express.static('uploads'));


app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});

app.use('/uploads', express.static('uploads')); // Serve static files from the 'uploads' directory

module.exports = app;