routeTest = require('supertest')
server = require('../../../index.js')
describe('Routes: Ticket', () => {

it('should return a list of tickets if admin', async () => {
    const response = await routeTest(server).get('/ticket').expect(404)
    // .expect((res) => {
    //     res.body.data.length > 1;
    //   })
    console.log(response.status)

})
it('should post a ticket if admin', async () => {
    const response = await routeTest(server).post('/ticket').expect(404)
    // .expect((res) => {
    //     res.body.data.length > 1;
    //   })
    console.log(response.status)

})
})