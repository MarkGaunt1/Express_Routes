const express = require ('express');
const router = express.Router();

const myFish = [
    {name: 'Nemo', owner: 'Pixar'},
   {name: 'Karlos', owner: 'Dr Seuss'},
   {name: 'Dory', owner: 'Pixar'},
   {name: 'Jaws', owner: 'Steven Spielberg'}
 ];

router.get('/fish', function(req,res){
    res.json({
         success: true,
         message: 'Here is all our fishy data!',
         fish: myFish
    })
})
    
router.get('/fish/:name',function(req,res){
    var theFish = myFish.filter(function (e) {
         console.log(req.params.name);
         return e.name === req.params.name;
         
       });
         res.json({
         success: true,
         message: 'Here is your fish!',
         fish: theFish
    })
})

router.post('/create',function(req,res){

    const found = myFish.find(e => e.name === req.body.name);
    console.log(found);

    if ('name' in req.body && 'owner' in req.body && !found ) {
    console.log(req.body);
    myFish.push(req.body);
    res.json({
         success: true,
         message: 'Delivered, thanks!'
    })
}    else {
  res.json({
      success: false,
      message: !found ? 'Data missing. Please try again ' : 'We already have this fish!'
  })
}
});
    

router.put('/fish/:name',function(req,res){

    
    
    const found = myFish.find(e => e.name === req.params.name);
    console.log(found);
    const index = myFish.indexOf(found);
    const body = req.body;

    if (!found) {
         res.json({
              success: true,
              message: 'Fish not found!'
          })
     }   else {
              const updatedFish = { ...found, ...body };
              myFish[index] = updatedFish;
          res.json({
              success: false,
              message: 'Your Fish data has been updated!'
          })
     }
     });

     router.delete('/fish/:name',function(req,res){
         const yourFish = myFish.find(e => e.name === req.params.name);
         const delIndex = myFish.indexOf(yourFish);
              
         if(!yourFish) {
              res.json({
                   success: true,
                   message: 'Fish not found!'

              })
         } else {
              myFish.splice(delIndex, 1);
          
              res.json({
              success: false,
              message: 'This fish has been removed from database!'
              
         })
    }
});

module.exports = router;