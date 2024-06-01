const mockingoose = require('mockingoose');
const Token = require('../src/models/token');
const Auth = require('../src/models/user');
const TokenService = require('../src/services/token');
const {auth, token} = require('../src/routes/auth')
jest.mock('../src/services/token');

// jest.mock('mongoose', () => ({
//     createConnection: jest.fn().mockImplementation(
//       (uri, options)=>({})
//       ),
//     Connection: jest.fn()
//   }))

  //const testUtils = require("../../../test-utils");
    const request = require("supertest");
    const server = require("../index");
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

// it("should return 200 for logout", async () => {
//     await testUtils.connectDB()
    
//     let tokener
//     const userAlpha= {email: "foo@user.com", password: "foobar"}
//     try{
      
//       tokener = await request(server).post("/auth/signup").send(userAlpha);
//     }catch(e){
//       console.log(e)
//     }
    
   
//     const tokenme = await request(server).post("/auth/login").send(userAlpha);
//     await testUtils.connectDB()
//     await sleep(300)
//     const res = await request(server).post("/auth/logout").set('authorization', `Bearer ${tokenme._body.token}`);
//     //expect(res.statusCode).toEqual(200)
//   });
describe('Routes: Auth', () => {
    const user0 = {
        email: "user0@mail.com",
        password: "123password",
      };
    it('should return 200 for logout', async () => {
        const email = "email@email.com"
        //let spy = jest.spyOn(person, 'sayMyName')
        //let spy = jest.mock(tokenService, 'isUserLoggedInMiddleware').mockImplementation((req, res, next) => next())
        //stubSinon = sinon.stub(token, 'isUserLoggedInMiddleware').callsFake((req, res, next) =>{  console.log('stubbed'); next()})
        //token.isUserLoggedInMiddleware = jest.fn().mockImplementation((req, res, next) => next())
        //sinon.stub().callsFake((req, res, next) =>{  console.log('stubbed'); next()})
        mockingoose(Token).toReturn({ email: email}, 'findOne')
        mockingoose(Token).toReturn({}, 'deleteOne')
        mockingoose(Auth).toReturn({}, 'updateOne')
        const res = await request(server).post('/auth/logout').send(user0)
        expect(res.statusCode).toEqual(200)
        
})
})
   