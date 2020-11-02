const express = require ('express');
const router = express.Router();

const myRabbits = [
    {name: 'Bugs-Bunny', owner: 'Elma Fudd'},
   {name: 'Roger-Rabbit', owner: 'Warner Bros'},
   {name: 'Harvey', owner: 'James Stewart'},
   {name: 'Starsky in Hutch', owner: 'Kojak'}
 ];

router.get('/rabbits', function(req,res){
    res.json({
         success: true,
         message: 'Here is all our rabbit data!',
         rabbits: myRabbits
    })
})
    
router.get('/rabbits/:name',function(req,res){
    var theRabbit = myRabbits.filter(function (e) {
         console.log(req.params.name);
         return e.name === req.params.name;
         
       });
         res.json({
         success: true,
         message: 'Here is your horse!',
         rabbit: theRabbit
    })
})

router.post('/create',function(req,res){

    const found = myRabbits.find(e => e.name === req.body.name);
    console.log(found);

    if ('name' in req.body && 'owner' in req.body && !found ) {
    console.log(req.body);
    myRabbits.push(req.body);
    res.json({
         success: true,
         message: 'Delivered, thanks!'
    })
}    else {
  res.json({
      success: false,
      message: !found ? 'Data missing. Please try again ' : 'We already have this rabbit!'
  })
}
});
    

router.put('/rabbits/:name',function(req,res){

    
    
    const found = myRabbits.find(e => e.name === req.params.name);
    console.log(found);
    const index = myRabbits.indexOf(found);
    const body = req.body;

    if (!found) {
         res.json({
              success: true,
              message: 'Rabbit not found!'
          })
     }   else {
              const updatedRabbit = { ...found, ...body };
              myRabbits[index] = updatedRabbit;
          res.json({
              success: false,
              message: 'Your Rabbit data has been updated!'
          })
     }
     });

     router.delete('/rabbits/:name',function(req,res){
         const yourRabbit = myRabbits.find(e => e.name === req.params.name);
         const delIndex = myRabbits.indexOf(yourRabbit);
              
         if(!yourRabbit) {
              res.json({
                   success: true,
                   message: 'Rabbit not found!'

              })
         } else {
              myRabbits.splice(delIndex, 1);
          
              res.json({
              success: false,
              message: 'This rabbit has been removed from database!'
              
         })
    }
});

module.exports = router;