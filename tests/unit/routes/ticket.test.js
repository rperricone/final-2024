routeTest = require('supertest')
server = require('../../../index.js')
describe('Routes: Ticket', () => {

it('should return a list of tickets if admin', async () => {
    const response = await routeTest(server).get('/ticket').expect(200)
    console.log(response.status)

})
it('should post a ticket if admin', async () => {
    const response = await routeTest(server).post('/ticket').expect(200)
    .expect((res) => {
        res.body.length > 1;
      })
    console.log(response.status)

})
})


it('should get a ticket id ', async () => {
    const response = await routeTest(server).get('/ticket/:id').expect(200)
    .expect((res) => {
        res.body.length> 1;
      })

     expect(response.body.ticketId).toBeTruthy() 
    console.log(response.status)

})
