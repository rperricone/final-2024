const activity = require('../models/activity');
const activityDAO = require('../daos/activity');
const router = require('express').Router();
const ADMIN = 'admin'
const TokenService = require('../services/token')
const token = new TokenService()

/**
 * @openapi
 * /activity/{activityId}:
 *   get:
 *    summary: get activity by id
 *    security:  JWT
 *    tags: [Activity]
 *    description: if admin, gets all activities, if user, gets all activities for that user
 *    responses:
 *       200:
 *         description: activity is found
 */
router.get('/activity/:activityId',[token.isUserLoggedInMiddleware.bind(token),token.roleCheck.bind(token,["admin"],true)], async (req, res) => {
  if (req.roleCheckPassed) {// get activity for admin , regardless of user
    try {
      const result = await activityDAO.getById(req.params.activityId)
      res.json(result)
    } catch (err) {
      res.status(404)
      res.json({ error: err.message })
      return
    }
    // if user, then get all activities for that user
  }else { 
    try {
      const result = await activityDAO.getAll(req.params.activityId, req.tokenPayload._id)
      res.json(result)
    } catch (err) {
      res.status(404)
      res.json({ error: err.message })
  
    }
  }
});

// router.get('/activity', (req,res) =>{
//   res.sendStatus(404)
// })

router.post('/activity/:ticketId',[token.isUserLoggedInMiddleware.bind(token),token.roleCheck.bind(token,["admin"],true)], 
async (req, res) => {
  
  try {
    req.body.dateCreated = new Date()
    req.body.userId = req.tokenPayload._id
    req.body.ticketId = req.params.ticketId
    const created = await activityDAO.create(req.body)
    res.send(created)
    return
  }
  catch (err) {
    res.status(400)
    res.json({ error: err.message })
  }

})
router.put('/activity/:activityId',[token.isUserLoggedInMiddleware.bind(token),token.roleCheck.bind(token,["admin"],true)], async (req, res) => {
  try{
    const result = await activityDAO.update(req.params.activityId, req.body)
    res.json(result)
  } catch (err) {
    res.status(400)
    res.json({ error: err.message })
  }
});
router.delete('/activity/:activityId',[token.isUserLoggedInMiddleware.bind(token),token.roleCheck.bind(token,["admin"],true)], async (req, res) => {
  try {
    let deleted = await activityDAO.deleteById(req.params.activityId)
    
    if (deleted.deletedCount == 0) {
      res.status(404)
      res.json({ success: false, error: 'delete id not found', id: req.params.activityId })
      return
    }
    res.json({ success: true, id: req.params.activityId });
    return
  } catch (err) {
    res.status(400)
    res.json({ error: err.message })
  }

});
module.exports = router;