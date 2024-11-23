const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    image:{type:String},
    // imageType:{type:String},
    imageTitle:{type:String},
    published:{type:Boolean, default: false},
})

// pageSchema.virtual('imageUrl').get(function() {
//     if(this.image && this.imageType) {
//         return `data:${this.imageType};base64,${this.image.toString('base64')}`
//     }
//     return null
// })
module.exports = mongoose.model('Page',pageSchema)