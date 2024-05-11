const router = require('express').Router();

router.get('/activity/:id', (req, res) => {
  res.send(req.params.id);
});
// router.get('/activity', (req,res) =>{
//   res.sendStatus(404)
// })

router.post('/activity/:id',(req,res)=>{
  res.sendStatus(404)
})
router.put('/activity/:id', (req, res) => {
  res.send(req.params.id);
});
router.delete('/activity/:id', (req, res) => {
  res.send(req.params.id);
});
module.exports = router;