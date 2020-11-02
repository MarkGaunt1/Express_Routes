const express = require ('express');
const router = express.Router();

const myFoxes = [
    {name: 'Freddie-Fox', owner: 'Peppa Pig'},
   {name: 'Fantastic-Mr-Fox', owner: 'Roald Dahl'},
   {name: 'Fox-in-Socks', owner: 'Dr Seuss'},
   {name: 'Mr-Todd', owner: 'Beatrix Potter'}
 ];

router.get('/foxes', function(req,res){
    res.json({
         success: true,
         message: 'Here is all our fox data!',
         foxes: myFoxes
    })
})
    
router.get('/foxes/:name',function(req,res){
    var theFox = myFoxes.filter(function (e) {
         console.log(req.params.name);
         return e.name === req.params.name;
         
       });
         res.json({
         success: true,
         message: 'Here is your fox!',
         fox: theFox
    })
})

router.post('/create',function(req,res){

    const found = myFoxes.find(e => e.name === req.body.name);
    console.log(found);

    if ('name' in req.body && 'owner' in req.body && !found ) {
    console.log(req.body);
    myFoxes.push(req.body);
    res.json({
         success: true,
         message: 'Delivered, thanks!'
    })
}    else {
  res.json({
      success: false,
      message: !found ? 'Data missing. Please try again ' : 'We already have this fox!'
  })
}
});
    

router.put('/foxes/:name',function(req,res){

    
    
    const found = myFoxes.find(e => e.name === req.params.name);
    console.log(found);
    const index = myFoxes.indexOf(found);
    const body = req.body;

    if (!found) {
         res.json({
              success: true,
              message: 'Fox not found!'
          })
     }   else {
              const updatedFox = { ...found, ...body };
              myFoxes[index] = updatedFox;
          res.json({
              success: false,
              message: 'Your Fox data has been updated!'
          })
     }
     });

     router.delete('/foxes/:name',function(req,res){
         const yourFox = myFoxes.find(e => e.name === req.params.name);
         const delIndex = myFoxes.indexOf(yourFox);
              
         if(!yourFox) {
              res.json({
                   success: true,
                   message: 'Fox not found!'

              })
         } else {
              myFoxes.splice(delIndex, 1);
          
              res.json({
              success: false,
              message: 'This fox has been removed from database!'
              
         })
    }
});

module.exports = router;