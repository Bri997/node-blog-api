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