const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const Auth = require('../models/user')
const Token = require('../models/token')
const { v4: uuidv4 } = require('uuid');

module.exports = {}
module.exports.hash = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password, salt)
  return hash
}
module.exports.compare = async (password, hash) => {
  return bcrypt.compare(password, hash)
}
module.exports.getAll = (page, perPage) => {
  return Auth.find()
    .limit(perPage)
    .skip(perPage * page)
    .lean()
}

module.exports.getById = (authId) => {
  if (!mongoose.Types.ObjectId.isValid(authId)) {
    return null
  }
  return Auth.findOne({ _id: authId }).lean()
}

module.exports.deleteById = async (authId) => {
  if (!mongoose.Types.ObjectId.isValid(authId)) {
    return false
  }
  await Auth.deleteOne({ _id: authId })
  return true
}

module.exports.updateById = async (email, password) => {
  await Auth.collection.createIndex({ email: 1 }, {unique: true});
  const pass = await module.exports.hash(password)
  let result = await Auth.updateOne(
    { email: email}, {password: pass },
  ) // todo : fix
  return result
}
function getEmailFromToken(token) {
  let data = Buffer.from(token.split('.')[1], 'base64').toString('utf-8')
  return JSON.parse(data).email
}
function getTokenPayload(token) {
  let data = Buffer.from(token.split('.')[1], 'base64').toString('utf-8')
  return JSON.parse(data)
}
module.exports.getEmailFromToken = getEmailFromToken
module.exports.logout = async (token) => {
  const email = getEmailFromToken(token)
  const isAlreadyLoggedIn = await Token.findOne({ email:email })
  if(isAlreadyLoggedIn){
  const tokenInDb = await Token.deleteOne({
    email: email
  })
}
  await Auth.updateOne({ email: email }, {loginUUID: uuidv4()})
}
module.exports.login = async (authData) => {
  try {
    const exists = await Auth.findOne({ email: authData.email })
    if (exists != null) {
      const compare = await module.exports.compare(
        authData.password,
        exists.password,
      )
      if (compare) {

        const isAlreadyLoggedIn = await Token.findOne({ email:authData.email})
        if(!isAlreadyLoggedIn){
        const tokenInDb = await Token.create({
          email: authData.email
        })
    }
        return exists
      } else {
        throw new Error('Incorrect Password')
      }
    } else {
      throw new Error('User not found')
    }
  } catch (e) {
    throw e
  }
}

module.exports.create = async (authData) => {
  await Auth.collection.createIndex({ email: 1 }, {unique: true});
  try {
    authData.roles = ['user']
    if(authData.admin){
      authData.roles.push('admin')
    }
    authData.password = await module.exports.hash(authData.password)
    authData.loginUUID = uuidv4()
    const created = await Auth.create(authData)
    return created
  } catch (e) {
    if (e.message.includes('validation failed')) {
      throw new BadDataError(e.message)
    }
    console.log('hit create error', e.message)
    throw e
  }
}

class BadDataError extends Error {}
module.exports.BadDataError = BadDataError
