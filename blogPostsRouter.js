const express = require('express');
const router = express.Router();
const {BlogPosts} = require('./models')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

BlogPosts.create(
        `My drivers license has been stolen`, `Blah blah this is some test text`, `Mary Q Public`);

BlogPosts.create(
            `Why Dogs are smelly`, `Profound blog text goes here OMG`, `Martin McDorky`);
router.get('/', (req, res) =>{
    res.json(BlogPosts.get())
    // res.send('get work')
    });

router.post('/', jsonParser, (req, res) => {
       
    const requiredFields = ['title', 'content', 'author'];
        for (let i=0; i<requiredFields.length; i++) {
          const field = requiredFields[i];
          if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
          }
        }
        const item = BlogPosts.create(
            req.body.title, req.body.content, req.body.author);
        res.status(201).json(item);
});
      

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
        console.log(`Deleted blog post with id \`${req.params.ID}\``);
        res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = [
        'id', 'title', 'content', 'author', 'publishDate'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    if (req.params.id !== req.body.id) {
      const message = (
        `Request path id (${req.params.id}) and request body id `
        `(${req.body.id}) must match`);
      console.error(message);
      return res.status(400).send(message);
    }
    console.log(`Updating blog post with id \`${req.params.id}\``);
    const updatedItem = BlogPosts.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate
    });
    res.status(204).end();
  });

module.exports = router;