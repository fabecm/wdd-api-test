var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://10.238.9.61:8080/edd-serviceWeb');

describe('Workspace', function() {

    const base = '/search/workspace';

    it ('should return a 200 response', function() {
        api.get(`${base}?pageNumber=1&pageLength=10`)
            .set('Accept', 'application/json')
            .set('iv-groups', 'value": "G_EDD_DQ')
            .set('iv-user', 'value": "1')
            .set('istitutoinq2', 'value": "UL')
            .expect(200)
    });

    it('should paginate correctly', function(done) {
        api.get(`${base}?pageNumber=1&pageLength=10`)
            .set('Accept', 'application/json')
            .set('iv-groups', 'value": "G_EDD_DQ')
            .set('iv-user', 'value": "1')
            .set('istitutoinq2', 'value": "UL')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                expect(res.body).to.have.property('datalist');
                expect(res.body).to.have.property('page_count');
                expect(res.body.datalist.length).to.be.at.most(10);

                done();
                
            });
    });

    it('should be populated correctly', function(done){
        api.get(`${base}?pageNumber=1&pageLength=10`)
            .set('Accept', 'application/json')
            .set('iv-groups', 'value": "G_EDD_DQ')
            .set('iv-user', 'value": "1')
            .set('istitutoinq2', 'value": "UL')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                expect(res.body).to.have.property('datalist');
                expect(res.body.datalist[0]).to.be.a('object');

                expect(res.body.datalist[0].workspace).to.be.a('object');
                expect(res.body.datalist[0].workspace.label).to.be.a('string');

                expect(res.body.datalist[0].start_date).to.be.a('object');
                expect(res.body.datalist[0].start_date.date).to.be.a('string');

                done();
                
            });
    });

});