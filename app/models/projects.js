const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: Array,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    images: {
        type:  Array,
        required: false
    },
    dates:{
        type : Array,
        required: true
    }
})

module.exports = mongoose.model('Projects', projectSchema)