const router = require('express').Router();
const dummyData = require('../../doc/ticket/GET_id_ticket_payload_response copy')
router.get('/ticket/:id', async (req, res) => {
  // get ticket data , add in activity data
  try{
  let ticketData = await ticketDAO.getById(req.params.id)
  let activityData = await activityDAO.getByTicketId(req.params.id)
  ticketData.activity = activityData
  res.json(ticketData)
  return
  } catch(err){
    res.status(404)
    res.json({error: err.message})
    return
  }
  
});


router.get('/ticket', (req,res) =>{
  console.log(dummyData)
  res.send([dummyData])
})

//create the ticket, post
router.post('/ticket',async (req,res)=>{
  await ticketDAO.create(req.body)
  res.send(
   
  )
})

router.post('/ticket/:id/activity',async (req,res)=>{
 try{
  const activity_id =  await activityDAO.create(req.body)
  res.json(
    {activity_id:activity_id}
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
