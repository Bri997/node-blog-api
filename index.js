const express = require('express');

const blogPost = require('./blogPostsRouter')

const app = express();
app.use('/blog-post', blogPost);








let PORT = process.env.PORT || 3000
 app.listen(PORT, () => {

    console.log(`You are on ${PORT}`)
})