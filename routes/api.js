const express = require ('express');
const router = express.Router();

const myHorses = [
    {name: 'Red-Rum', owner: 'John Smith'},
   {name: 'Shergar', owner: 'Tom Jones'},
   {name: 'Party-Politics', owner: 'Sue Harris'},
   {name: 'Royal-Athlete', owner: 'Maggie Thatcher'}
 ];

router.get('/horses', function(req,res){
    res.json({
         success: true,
         message: 'Here is all our equine data!',
         horses: myHorses
    })
})
    
router.get('/horses/:name',function(req,res){
    var theHorse = myHorses.filter(function (e) {
         console.log(req.params.name);
         return e.name === req.params.name;
         
       });
         res.json({
         success: true,
         message: 'Here is your horse!',
         horse: theHorse
    })
})

router.post('/create',function(req,res){

    const found = myHorses.find(e => e.name === req.body.name);
    console.log(found);

    if ('name' in req.body && 'owner' in req.body && !found ) {
    console.log(req.body);
    myHorses.push(req.body);
    res.json({
         success: true,
         message: 'Delivered, thanks!'
    })
}    else {
  res.json({
      success: false,
      message: !found ? 'Data missing. Please try again ' : 'We already have this horse!'
  })
}
});
    

router.put('/horses/:name',function(req,res){

    
    
    const found = myHorses.find(e => e.name === req.params.name);
    console.log(found);
    const index = myHorses.indexOf(found);
    const body = req.body;

    if (!found) {
         res.json({
              success: true,
              message: 'Horse not found!'
          })
     }   else {
              const updatedHorse = { ...found, ...body };
              myHorses[index] = updatedHorse;
          res.json({
              success: false,
              message: 'Your Horse data has been updated!'
          })
     }
     });

     router.delete('/horses/:name',function(req,res){
         const yourHorse = myHorses.find(e => e.name === req.params.name);
         const delIndex = myHorses.indexOf(yourHorse);
              
         if(!yourHorse) {
              res.json({
                   success: true,
                   message: 'Horse not found!'

              })
         } else {
              myHorses.splice(delIndex, 1);
          
              res.json({
              success: false,
              message: 'This horse has been removed from database!'
              
         })
    }
});

module.exports = router;