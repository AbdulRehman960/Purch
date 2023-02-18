const mongoose=require('mongoose')

const wallSchema=new mongoose.Schema({
    name:{
        type:String
    },
    create:{
        type:String
    },
    isnew:{
        type:Boolean,
        default:true
    }
})
wallSchema.methods.toJSON=function(){
    const wall=this
    const wallObject=wall.toObject()

    delete wallObject.__v
    delete wallObject.create

    return wallObject
}
const Wallpaper=mongoose.model('Wallpaper',wallSchema)

module.exports=Wallpaper