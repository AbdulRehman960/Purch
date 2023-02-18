const express=require('express')
const Videos = require('../models/videos')
const router=new express.Router()


// GET /videos/list?cat=(fun||animation-series||strategy)?serieName
// GET /videos/list?seriesList==> it gives u list of series
router.get('/amongus/videos/list',async (req,res)=>{
  try{
         const serieName=req.query.serieName
         console.log(serieName)
         const date=new Date().getTime()
         const videos=await Videos.find({})
         videos.forEach(async(item)=>{
            if(date-item.create>604800000){
               await Videos.findByIdAndUpdate({_id:item._id},{isnew:false})

            }
         })
               if(req.query.seriesList==="true"){
                  const videosUpdatedList=await Videos.aggregate([
                     {$group:{_id:"$serieName"}}
                  ])
                  const resault=videosUpdatedList.filter(obj=>obj._id.length>0)
                  res.send(resault)
               }else if(req.query.cat==="fun"){
                  const videosUpdatedList=await Videos.find({cat:'fun'}).sort({isnew:-1}).sort({create:-1})
                  return res.send(videosUpdatedList)
               }else if(req.query.cat==="strategy"){
                  const videosUpdatedList=await Videos.find({cat:'strategy'}).sort({isnew:-1})
                  return res.send(videosUpdatedList)
               }else if(req.query.cat==="series"){
                  const videosUpdatedList=await Videos.find({cat:'Series',serieName:serieName}).sort({isnew:-1}).sort({create:-1})
                  return res.send(videosUpdatedList)
               }else{
                  const videosUpdatedList=await Videos.find({}).sort({isnew:-1}).sort({create:-1})
                  return res.send(videosUpdatedList)
               }

} catch(e){
         res.send().status(400)
}
})
// GET /videos/cover?id=12736782637123?
router.get('/amongus/videos/cover',async(req,res)=>{
   try{
      if(req.query.id){
         const video=await Videos.findById(req.query.id)
         const path ='C:\\Users\\Ali\\Img\\cover\\'+video.name+'.jpg'
                       res.set('Content-Type','image/jpg')
                return res.sendFile(path)
      }else if(req.query.serieName){
         const video=await Videos.findOne({serieName:req.query.serieName})
         const path ='C:\\Users\\Ali\\Img\\cover\\'+video.serieName+'.jpg'
                       res.set('Content-Type','image/jpg')
                return res.sendFile(path)
      }else {
         const path='C:\\Users\\Ali\\Img\\cover\\default.jpg'
                       res.set('Content-Type','image/jpg')
                return res.sendFile(path)       
      }



   }catch(e){
         res.send(e).status(400)
   }
})
router.post("/amongus/videos/addnew",async(req,res)=>{
   try{
       const video=new Videos(req.body)
         video.create=new Date().getTime()
          await video.save()
             res.send(video).status(200)
   }catch(e){
               res.send().status(400)
   }
})


module.exports=router