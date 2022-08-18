const router = require('express').Router()
const multer = require('multer')
const authMiddleware = require('../middlewares/authMiddleware')

let createdFilename = ''
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename: function (req, file, cb) {
        createdFilename =  Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname
        cb(null,  createdFilename )
    }
})
const upload = multer({storage})
router.post('/',[
    authMiddleware,
    upload.single('file')
],(req,res)=>{
    try{
        return res.status(200).json({message: createdFilename})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Internal error'})
    }
})




module.exports = router