const mongoose = require('mongoose')

const blogPostSchema = mongoose.Schema({

  title: {type: String , required: true},
  content: {type: String , required: true},
  author: {type: String , required: true},
  created: {type: Date , default: Date.now, required: true}
  


})



