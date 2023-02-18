const Wallpaper=require('../models/wallpaper')
const express=require('express')
const router=new express.Router()

// /amongus/wallpaper/list?limit=&skip=
router.get('/amongus/wallpaper/list',async(req,res)=>{
   try{
       const limit=parseInt(req.query.limit)
       const skip=parseInt(req.query.skip)

       const date=new Date().getTime()
       const walls=await Wallpaper.find({})
            walls.forEach(async(item)=>{
                if(date-item.create>604800000){
                    await Wallpaper.findByIdAndUpdate({_id:item._id},{isnew:false})
                }
            })
                const wallsUpdate=await Wallpaper.find({}).skip(skip).limit(limit).sort({isnew:-1}).sort({create:-1})
                res.send(wallsUpdate).status(200)
    } catch(e){
                res.send().status(400)
    }
})
// /amongus/wallpaper/download/:id?temp=true||false
router.get('/amongus/wallpaper/download/:id',async(req,res)=>{
   try{
        const img=await Wallpaper.findById(req.params.id)
        console.log(img)
            if(!img){
                throw new Error
            }
                
                const path='C:\\Users\\Ali\\Img\\'+img.name+'.jpg'
                res.set('Content-Type','image/jpg')
                res.sendFile(path)
   }catch(e){
                res.send().status(400)
   }
})
router.post('/amongus/addwallpaper/alirastegar',async(req,res)=>{
    try{    
        const wall=new Wallpaper(req.body)
            wall.create=new Date().getTime()
            await wall.save()
                res.send(wall).status(200)
    }catch(e){
                    res.send().status(400)
    }
})

module.exports=router