const router = require('express').Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')


router.post('/registration',[
    check('username','Username can not be empty').notEmpty(),
    check('password', 'Password must be with  min 4 and maximum 10 length').isLength({min:4,max:10})
],controller.registration)
router.post('/login', controller.login)


module.exports=router