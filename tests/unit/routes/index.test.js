const mockingoose = require('mockingoose');
const Token = require('../../../src/models/token');
const Auth = require('../../../src/models/user');
const TokenService = require('../../../src/services/token');
const {index, errorHandler} = require('../../../src/routes/index')

    const request = require("supertest");
    const server = require("../../../index");
 

describe('Routes: Index', () => {
  
    it('shows error handler', () => {
      const req= jest.fn()
      const res = {status:jest.fn(), json:jest.fn()} 
      const next = jest.fn()
      errorHandler(new Error('sample test'),req,res,next)
      expect(errorHandler).toBeDefined()
      expect(res.status).toBeCalledWith(500)
    })
    it('shows error handler res.headersSent', () => {
      const req= jest.fn()
      const res = {status:jest.fn(), json:jest.fn(), headersSent: true} 
      const next = jest.fn()
      const err = new Error('sample test')
      errorHandler(err,req,res,next)
      expect(errorHandler).toBeDefined()
      expect(next).toBeCalledWith(err)
    })
})
   