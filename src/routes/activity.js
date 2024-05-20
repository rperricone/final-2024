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
router.get('/activity/:activityId', token.roleCheck.bind(token, [ADMIN], true), async (req, res) => {
  if (req.roleCheckPassed) {// get activity for admin , regardless of user
    try {
      await activityDAO.getById(req.params.activityId)
    } catch (err) {
      res.status(404)
      res.json({ error: err.message })
    }
    // if user, then get all activities for that user
  }else { 
    try {
      await activityDAO.getAll(req.params.activityId, req.tokenPayload._id)
    } catch (err) {
      res.status(404)
      res.json({ error: err.message })
  
    }
  }
});

// router.get('/activity', (req,res) =>{
//   res.sendStatus(404)
// })

router.post('/activity/:ticketId', async (req, res) => {
  req.body.dateCreated = new Date()
  req.body.userId = req.tokenPayload._id
  req.body.ticketId = req.params.ticketId
  try {
    const created = await activityDAO.create(req.body)
    res.send(created)
    return
  }
  catch (err) {
    res.status(400)
    res.json({ error: err.message })
  }

})
router.put('/activity/:activityId', async (req, res) => {
  await activityDAO.update(req.params.activityId, req.body)
});
router.delete('/activity/:activityId', async (req, res) => {
  try {
    let deleted = await activityDAO.deleteById(req.params.activityId)
    console.log(deleted)
    if (deleted.deletedCount == 0) {
      res.status(404)
      res.json({ success: false, error: 'delete id not found', id: req.params.activityId })
      return
    }
    res.json({ success: true, id: req.params.activityId });
    return
  } catch (err) {
    res.status(404)
    res.json({ error: err.message })
  }

});
module.exports = router;