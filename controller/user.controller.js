const User = require('../model/user.model')
const userService = require('../service/user.service')
const config = require('config')
const bcrypt = require('bcrypt')
const {userFields} = require('../validation/user.validation')


const getLoginForm = (req,res)=>{
    return res.render('login/layout')
}

const login = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}

    const {error,value} = userFields(fields)
    if(error){
        return res.render('login/layout',{message:error.details[0].message})
    }
    const findUser = await userService.getEmail({email})
    if(!findUser){
        return res.render('signup/layout',{message:'User does not Exist Signup here'})
    }
    const matchPassword = await bcrypt.compare(password,findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'Credentials Mismatched'})
    }
    return res.render('user/layout')

}

const getSignupForm = (req,res) =>{
    return res.render('signup/layout')
}

const signup = async(req,res) =>{

    const {email,password} = req.body
    const fields = {email,password}

    const {error,value} = userFields(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
    }
    const findUser = await userService.getEmail({email})
    if(findUser){
        return res.render('login/layout',{message:'User Exist Login here'})
    }
    const hashPassword = await bcrypt.hash(password,config.get('hash.salt'))
    const createUser = await userService.createEntries({email,password:hashPassword})
    return res.render('signup/layout',{message:'User Created'})

}

module.exports = {getLoginForm,login,getSignupForm,signup}