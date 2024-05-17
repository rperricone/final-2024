const mongoose = require('mongoose')

const Ticket = require('../models/ticket')

const { v4: uuidv4 } = require('uuid');
module.exports = {}
module.exports.getAll = (userId = undefined) => {
    if(userId){
        return Ticket.find({userId: userId}).lean()//find all tickets for a user
    }
  return Ticket.find().lean()
}

module.exports.getById = (ticketId) => {
  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    throw new Error('Invalid ticket ID')
  }
  return Ticket.findOne({ _id: ticketId }).lean()
}

module.exports.deleteById = async (ticketId) => {
  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    return false
  }
  await Ticket.deleteOne({ _id: ticketId })
  return true
}

module.exports.create = async (ticketData) => {
 // get location lat, lon, description, and userId from ticketData
  try {
   
    const created = await Ticket.create(ticketData)
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
