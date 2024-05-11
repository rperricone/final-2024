const router = require('express').Router();
router.get('/ticket/:id', (req, res) => {
  res.send(req.params.id);
});
router.get('/ticket', (req,res) =>{
  res.sendStatus(404)
})

router.post('/ticket',(req,res)=>{
  res.sendStatus(404)
})
router.put('/ticket/:id', (req, res) => {
  res.send(req.params.id);
});
router.delete('/ticket/:id', (req, res) => {
  res.send(req.params.id);
});
module.exports = router;
