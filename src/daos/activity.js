
const mongoose = require('mongoose')

const Activity = require('../models/activity')

module.exports = {}
module.exports.getAll = (userId = undefined) => {
    if(userId){
        return Activity.find({userId: userId}).lean()//find all tickets for a user
    }
  return Activity.find().lean()
}

module.exports.getById = (activityId) => {
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    throw new Error('Invalid ticket ID')
  }
  return Activity.findOne({ _id: activityId }).lean()
}
module.exports.getAllByTicket = (ticketId) => {
    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      throw new Error('Invalid ticket ID')
    }
    return Activity.find({ ticketId: ticketId }).lean()
  }

module.exports.deleteById = async (activityId) => {
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return false
  }
  await Activity.deleteOne({ _id: activityId })
  return true
}

module.exports.create = async (ticketData) => {
 // get location lat, lon, description, and userId from ticketData
  try {
   
    const created = await Activity.create(ticketData)
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
