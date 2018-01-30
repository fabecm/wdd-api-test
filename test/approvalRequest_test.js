var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://10.238.9.61:8080/edd-serviceWeb');

describe('Approval Request', function() {

    const base = '/search/dataquality/approval';

    it ('should return a 200 response', function() {
        api.post(`${base}?pageNumber=1&pageLength=10`)
            .set('Accept', 'application/json')
            .set('iv-groups', 'value": "G_EDD_DQ')
            .set('iv-user', 'value": "1')
            .set('istitutoinq2', 'value": "UL')
            .send({})
            .expect(200)
    });

    it('should paginate correctly', function(done) {
        api.post(`${base}?pageNumber=1&pageLength=10`)
            .set('Accept', 'application/json')
            .set('iv-groups', 'value": "G_EDD_DQ')
            .set('iv-user', 'value": "1')
            .set('istitutoinq2', 'value": "UL')
            .send({})
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                expect(res.body).to.have.property('data_list');
                expect(res.body).to.have.property('page_count');
                expect(res.body.data_list.length).to.be.at.most(10);

                done();
                
            });
    });

    it('should be populated correctly', function(done){
        api.post(`${base}?pageNumber=1&pageLength=10`)
            .set('Accept', 'application/json')
            .set('iv-groups', 'value": "G_EDD_DQ')
            .set('iv-user', 'value": "1')
            .set('istitutoinq2', 'value": "UL')
            .send({})
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                expect(res.body).to.have.property('data_list');
                expect(res.body.data_list[0]).to.be.a('object');

                expect(res.body.data_list[0].id_field).to.be.a('number');

                done();
                
            });
    });

});