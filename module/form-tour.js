const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Form = new mongoose.Schema({
    customer_name:{
        type : String,
        require: true,
    }, 
    gmail : {
        type: String,
        require: true
    }
})

const  FormData = new mongoose.model("Form", Form)

module.exports = FormData;