const { Router } = require('express')
const router = Router()
const TokenService = require('../services/token')
const authDAO = require('../daos/auth')
let token = new TokenService()
module.exports = {token}
function emailPassValidate(req, res, onlyPassword = false){
    if(onlyPassword){
    if( !req.body.password){
        res.status(400)
        res.json({ error: 'need password' })
        return false
    }
    return true 
}
// console.log(req)
    if (!req.body.email || !req.body.password) {
        res.status(400)
        res.json({ error: 'need email and password' })
        return false
      }
      return true
}
router.post('/signup', async (req, res) => {
  try {
    if (!emailPassValidate(req, res)){
        return
    }
    const user = await authDAO.create(req.body)
    
    const createToken = await token.createToken(user)
    res.json({ token: createToken })
  } catch (e) {
    if (!res.headersSent) {
      res.status(409)
      res.json({ error: e.message })
     
    }
    return 
  }

  return
})
router.post('/login', async (req, res, next) => {
  try {
    if (!emailPassValidate(req, res)){
        return
    }
    const user = await authDAO.login(req.body)
    const createToken = await token.createToken(user)
    res.json({ token: createToken })
  } catch (e) {
    res.status(401)
    res.json({ error: e.message })
    next()
    return
  }

  return
})
router.post('/logout',token.isUserLoggedInMiddleware.bind(token), async (req, res, next) => {
  console.log('hit logout')
  // try {
  //   await authDAO.logout(req.headers.authorization)
  // } catch (e) {
  //   if (!res.headersSent) {
  //     res.status(401)
  //     res.json({ error: e.message })
  //     next()
  //   }
  //   return
  // }
})
router.put('/password', async (req, res, next) => {
    if (!req.body.password || req.body.password === ''){
        res.status(400)
        res.send({error: 'need password'})
        return
    }
   
  try{
    await authDAO.updateById( authDAO.getEmailFromToken(req.headers.authorization),req.body.password)
    res.status(200)
    res.json({ message: 'password updated' })
   }catch(err){
    res.status(500)
    res.json({ error: err.message })
    return
   
   } // {password: 'newPassword'} , Authorization : bearer token verified
})

module.exports = {...module.exports,auth:router,emailPassValidate}
