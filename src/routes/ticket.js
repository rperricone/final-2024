const router = require('express').Router();
const ticketDAO = require('../daos/ticket')
const activityDAO = require('../daos/activity')
const dummyData = require('../../doc/ticket/GET_id_ticket_payload_response copy')
const TokenService = require('../services/token')
const token = new TokenService()
router.use(token.isUserLoggedInMiddleware.bind(token))
router.get('/ticket/:id', async (req, res) => {
  // get ticket data , add in activity data
  try{
  let ticketData = await ticketDAO.getById(req.params.id)
  let activityData = await activityDAO.getAllByTicket(req.params.id)
  ticketData.activity = activityData
  res.json(ticketData)
  return
  } catch(err){
    res.status(404)
    res.json({error: err.message})
    return
  }
  
});


router.get('/ticket',async  (req,res) =>{
  //get all tickets - admin only perhaps?
  const tickets = await ticketDAO.getAll()
  for(let ticket of tickets){
    ticket.activity = await activityDAO.getAllByTicket(ticket._id)
  }

  res.json(tickets)
})

//create the ticket, post
router.post('/ticket',async (req,res)=>{
  req.body.dateCreated = new Date()
  req.body.userId = req.tokenPayload._id
  console.log(req.body)
  let created = await ticketDAO.create(req.body)
  res.send(
   created 
  )
})

router.post('/ticket/:id/activity',async (req,res)=>{
 try{
  req.body.ticketId = req.params.id
  req.body.userId = req.tokenPayload._id
  const activity_id =  await activityDAO.create(req.body)
  res.json(
    activity_id
  )
  return
 }catch(err){
    res.status(400)
    res.json({error: err.message})
    return
 }
 
})
router.put('/ticket/:id', (req, res) => {
  res.send(req.params.id);
});
router.delete('/ticket/:id', (req, res) => {
  res.send(req.params.id);
});
module.exports = router;
