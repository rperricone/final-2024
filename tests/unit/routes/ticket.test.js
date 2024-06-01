request = require('supertest')
server = require('../../../index.js')
const { MongoClient } = require('mongoose');
const testUtils = require("../../../test-utils");
const Ticket = require("../../../src/models/ticket");
jest.setTimeout(20 * 1000)
let tokenUser
let tokenAdmin
let ticketId
describe('Routes: Ticket', () => {

    afterAll(testUtils.stopDB);
    // beforeEach(async()=>{
    //     await testUtils.connectDB()
    // })
    //afterEach(testUtils.clearDB);
    beforeAll(async () => {
        await testUtils.connectDB()
       
     
       try{
         const signupUser = await request(server).post('/auth/signup').send({
            "email": "rperricone@user.com",
            "password": "foobar"
        })
        // await testUtils.stopDB()
    }catch(e){
        console.log(e)
    }
    try{
        await testUtils.connectDB()
        const signupAdmin = await request(server).post('/auth/signup').send({
            "email": "rperricone@admin.com",
            "password": "foobar",
            "admin": true
        })
        // await testUtils.stopDB()
    }catch(e){
        console.log(e)
    }
        await testUtils.connectDB()
        const dataAdmin = await request(server).post('/auth/login')
            .send({
                "email": "rperricone@admin.com",
                "password": "foobar",
            })
          
        await testUtils.connectDB()
        const data = await request(server).post('/auth/login')
            .send({
                "email": "rperricone@user.com",
                "password": "foobar",
            })
        
        tokenUser = data._body.token
        tokenAdmin = dataAdmin._body.token
    });



    it('should return a list of tickets if admin', async () => {
        console.log(tokenAdmin,'tokenAdmin')
        const response = await request(server).get('/ticket').set('authorization', `Bearer ${tokenAdmin}`).expect(200)
        console.log(response.status)

    }, 20  *1000)
    it('should post a ticket if admin', async () => {
        
        const response = await request(server).post('/ticket')
            .set('Authorization', `${tokenAdmin}`)
            .send({ description: 'test', location: { lat: 1, lon: 2 } })
            .expect(200)
            .expect((res) => {
                res.body.length > 1;
            })
        console.log(response.id)

    })



it('should get a ticket id ', async () => {
    await testUtils.connectDB()
    const ticket = await request(server).post('/ticket')
    .set('Authorization', `${tokenAdmin}`)
    .send({ description: 'test', location: { lat: 1, lon: 2 } })
    .expect(200)
    await testUtils.connectDB()
    const response = await request(server).get('/ticket/'+ticket._body._id)
    .set('Authorization', `${tokenAdmin}`)
    .expect(200)
        .expect((res) => {
            res.body.length > 1;
        })

    expect(response._body._id).toBeTruthy()
    console.log(response.status)

})
})