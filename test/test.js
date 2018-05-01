const chai = require('chai')
const chaiHttp = require('chai-http')
const {app, runServer, closeServer} = require('../index');

const expect = chai.expect;

chai.use(chaiHttp)

describe('Blog Post', function() {


    before(function (){
        return runServer()
    })

    after(function() {
        return closeServer()
    })
})

it('should GET the blog posts', function () {
    return chai.request(app)
    .get('/blog-post')
    .then(function(res) {
        expect(res).to.have.status(200)
    })

})

it('shoud add a blog post on POST', function () {
    const newBlogPost = {
        title: "A test title", content: "Some test content", author: "A Test Author"
    }
    return chai.request(app)
    .post('/blog-post')
    .send(newBlogPost)
    .then(function(res){
        expect(res).to.have.status(201);
        expect(res).to.be.json
        
    
    });

});

it('should fail when POST missing title, content, or author', function () {
    const newBlogPost = {
        content: "Missing title", author: "Missing Title"
    }
    return chai.request(app)
    .post('/blog-post')
    .send(newBlogPost)
    .then(function (res){
        expect(res).to.have.status(400);
    })
})



it('should delete a post', function () {
        return chai.request(app)
        .get('/blog-post')
        .then(function(res){
            return chai.request(app)
            .delete(`/blog-post/${res.body[0].id}`)
        })
        .then(function(res){
            expect(res).to.have.status(204)
        })

})


it('should upate a blog post on PUT', function(){
    return chai.request(app)
   
    .get('/blog-post')
    .then(function( res) {
      const updatedPost = Object.assign(res.body[0], {
        title: 'A another test title',
        content: 'some content',
        author: 'Blah',
        publishDate: ""
      });
      return chai.request(app)
        .put(`/blog-post/${res.body[0].id}`)
        .send(updatedPost)
        .then(function(res) {
          expect(res).to.have.status(204);
        });
    });
});