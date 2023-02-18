const mongoose=require('mongoose')

const videoSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    link:{
        type:String,
    },
    cat:{
        type:String,
    },
    serieName:{
        type:String,
        default:""
    },
    isnew:{
        type:Boolean,
        default:true
    },
    create:{
        type:String
    }
})
videoSchema.methods.toJSON=function(){
    const video=this
    const videoObject=video.toObject()

        delete videoObject.create
        delete videoObject.__v
        
        return videoObject
}

const Videos=mongoose.model('Videos',videoSchema)


module.exports=Videos