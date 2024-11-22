const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    title:{type:String, required:true},
    title:{type:String, required:true},
    image:{type:String},
    imageTitle:{type:String},
    published:{type:Boolean, default: false},
})

module.exports = mongoose.model('Page',pageSchema)