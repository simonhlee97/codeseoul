let chai = require('chai');
let chaiHttp = require('chai-http');

const config = require('config');
let User = require('models/User');

if(config.MEETUPKEY === '<your meetup key>'){
    console.warn('WARNING: change meetup key in config file to get correct test result!');
}

describe('event api', () => {
    //TODO: separate tests which not needs auth
    before((done)=>{
        User.drop();
        agent
            .post('/api/v1.0/user/register/local')
            .send({
                'username': 'helow1',
                'password': 'asdasdasd',
                'role':'admin'
            })
            .end((err, res) => {
                agent
                .post('/api/v1.0/user/login')
                .send({
                    'username': 'helow1',
                    'password': 'asdasdasd'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.be.an('object');
                    user = res.body.user;
                    
                    done();
                });
            });
    })

    it('/event/meetup/events get should return meetup event data', (done) => {
        agent
            .get(`/api/v1.0/event/meetup/events?page=2`)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(JSON.parse(res.body.data)).to.have.lengthOf(2);
                done();
            });
    });
    
    it('/event/meetup/events post should create a meetup event', (done) => {
        agent
            .post(`/api/v1.0/event/meetup/events?sign=true&key=${config.MEETUPKEY}`)
            .send({name:'test event name'})
            .end((err, res) => {
                res.should.have.status(201);
                expect(res.body).to.be.an('object');
                expect(JSON.parse(res.body.data)).to.have.lengthOf(1);
                done();
            });
    });

    it('/event/meetup/me/groups get should return user groups', (done) => {
        agent
            .get(`/api/v1.0/event/meetup/me/groups?page=2&sign=true&key=${config.MEETUPKEY}`)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(JSON.parse(res.body.data)).length.to.be.within(1,2);
                done();
            });
    });
});