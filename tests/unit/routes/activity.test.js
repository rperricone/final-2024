request = require('supertest')
server = require('../../../index.js')
const { MongoClient } = require('mongoose');
const testUtils = require("../../../test-utils");
const Ticket = require("../../../src/models/ticket");
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
let tokenUser
let tokenAdmin
let ticketId
describe('Routes: Activity', () => {
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
    }, 20*1000);

it('/activity/:ticketId should return 400 if something went wrong', async () => {
    await testUtils.stopDB()
    const res = await request(server).post('/activity/foobar')
    .set('authorization', `Bearer ${tokenAdmin}`)
    .send({
        "description": "cleaned up stuff",
        "status": "CLOSED"
})
    expect(res.statusCode).toEqual(400) // because it is not valid
    await testUtils.connectDB()
})
it('GET /activity/:activityId should return 200 if everything is ok', async () => {
    await testUtils.connectDB()
    const ticket = await request(server).post('/ticket')
    .set('Authorization', `${tokenAdmin}`)
    .send({
        "description": "test",
        "location": { "lat": 1, "lon": 2 },
    }).expect(200)
    ticketId = ticket.body._id
    await testUtils.connectDB()
    const res = await request(server).post(`/activity/${ticketId}`)
    .set('authorization', `Bearer ${tokenAdmin}`)
    .send({
        "description": "cleaned up stuff",
        "status": "CLOSED"
    })
    expect(res.statusCode).toEqual(200)
    await testUtils.connectDB()
    const getActivity = await request(server).get(`/activity/${res._body._id}`)
    .set('authorization', `Bearer ${tokenAdmin}`)
    expect(getActivity.statusCode).toEqual(200)
    expect(getActivity._body._id).toEqual(res._body._id)
})
it('GET /activity/:activityId should return 404 if not found id', async () => {
    await testUtils.connectDB()
    const getActivity = await request(server).get(`/activity/funkytown123`)
    .set('authorization', `Bearer ${tokenAdmin}`)
    expect(getActivity.statusCode).toEqual(404)
})
it('GET /activity/:activityId as user should return 200 if everything is ok', async () => {
    await testUtils.connectDB()
    const ticket = await request(server).post('/ticket')
    .set('Authorization', `${tokenAdmin}`)
    .send({
        "description": "test",
        "location": { "lat": 1, "lon": 2 },
    }).expect(200)
    ticketId = ticket.body._id
    await testUtils.connectDB()
    const res = await request(server).post(`/activity/${ticketId}`)
    .set('authorization', `Bearer ${tokenAdmin}`)
    .send({
        "description": "cleaned up stuff",
        "status": "CLOSED"
    })
    expect(res.statusCode).toEqual(200)
    await testUtils.connectDB()
    const getActivity = await request(server).get(`/activity/${res._body._id}`)
    .set('authorization', `Bearer ${tokenUser}`)
    expect(getActivity.statusCode).toEqual(200)
    //expect(getActivity._body._id).toEqual(res._body._id)
})
it('GET /activity/:activityId should return 404 if not found id', async () => {
    await testUtils.connectDB()
    const getActivity = await request(server).get(`/activity/funkytown123`)
    .set('authorization', `Bearer ${tokenUser}`)
    expect(getActivity.statusCode).toEqual(404)
})
it('PUT /activity/:activityId should return 400  if not found id', async () => {
    await testUtils.connectDB()
    const getActivity = await request(server).put(`/activity/funkytown123`)
    .set('authorization', `Bearer ${tokenAdmin}`)
    expect(getActivity.statusCode).toEqual(400)
})
it('PUT /activity/:activityId should return 200  if modified activity with id', async () => {
    await testUtils.connectDB()
    const ticket = await request(server).post('/ticket')
    .set('Authorization', `${tokenAdmin}`)
    .send({
        "description": "test",
        "location": { "lat": 1, "lon": 2 },
    }).expect(200)
    const ticketId = ticket._body._id
    const activity = await request(server).post(`/activity/${ticketId}`)
    .set('Authorization', `${tokenAdmin}`)
    .send({
        "description": "test",
        "status": "OPEN",
    }).expect(200)
    const activityId = activity._body._id
    const getActivity = await request(server).put(`/activity/${activityId}`)
    .set('authorization', `Bearer ${tokenAdmin}`)
    expect(getActivity.statusCode).toEqual(200)
})

it('DELETE /activity/:activityId should return 200  if deleted activity with id', async () => {
    await testUtils.connectDB()
    const ticket = await request(server).post('/ticket')
    .set('Authorization', `${tokenAdmin}`)
    .send({
        "description": "test",
        "location": { "lat": 1, "lon": 2 },
    }).expect(200)
    const ticketId = ticket._body._id
    const activity = await request(server).post(`/activity/${ticketId}`)
    .set('Authorization', `${tokenAdmin}`)
    .send({
        "description": "test",
        "status": "OPEN",
    }).expect(200)
    const activityId = activity._body._id
    const deleteActivity = await request(server).delete(`/activity/${activityId}`)
    .set('authorization', `Bearer ${tokenAdmin}`)
    expect(deleteActivity.statusCode).toEqual(200)
})
it('DELETE /activity/:activityId should return 404  if deleted activity with id not deleted', async () => {
    await testUtils.connectDB()
    const ticket = await request(server).post('/ticket')
    .set('Authorization', `${tokenAdmin}`)
    .send({
        "description": "test",
        "location": { "lat": 1, "lon": 2 },
    }).expect(200)
    const ticketId = ticket._body._id
    const activity = await request(server).post(`/activity/${ticketId}`)
    .set('Authorization', `${tokenAdmin}`)
    .send({
        "description": "test",
        "status": "OPEN",
    }).expect(200)
    const activityId = activity._body._id
    const deleteActivityBefore = await request(server).delete(`/activity/${activityId}`)
    .set('authorization', `Bearer ${tokenAdmin}`)
    const deleteActivity = await request(server).delete(`/activity/${activityId}`)
    .set('authorization', `Bearer ${tokenAdmin}`)
    expect(deleteActivity.statusCode).toEqual(404)
})
it('DELETE /activity/:activityId should return 400 if error with id not deleted', async () => {
    await testUtils.connectDB()
    const ticket = await request(server).post('/ticket')
    .set('Authorization', `${tokenAdmin}`)
    .send({
        "description": "test",
        "location": { "lat": 1, "lon": 2 },
    }).expect(200)
    const ticketId = ticket._body._id
    const activity = await request(server).post(`/activity/${ticketId}`)
    .set('Authorization', `${tokenAdmin}`)
    .send({
        "description": "test",
        "status": "OPEN",
    }).expect(200)
    const activityId = activity._body._id
    const deleteActivity = await request(server).delete(`/activity/${activityId}123`)
    .set('authorization', `Bearer ${tokenAdmin}`)
    expect(deleteActivity.statusCode).toEqual(400)
})
})