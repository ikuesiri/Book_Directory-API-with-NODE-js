
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_KEY, JWT_LIFE_TIME} =require('../config')


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[ true, 'Please enter your Username'],
        unique : [true, "username already exists, please try another username"],
        lowercase : true
    },
    
    password:{
        type: String,
        required:[ true, 'Please enter your password'],

    },
   
}, { timestamps : true })


userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(this.password, salt);
    this.password = hashpass
    next()

})


userSchema.methods.generateJWT = function() {
    return jwt.sign(
        {userID : this._id, username : this.username},
         JWT_KEY, 
        { expiresIn : JWT_LIFE_TIME}
        );
};


userSchema.methods.validatePassword = async function( password) {
    const compare =await  bcrypt.compare(password, this.password)
    return compare

}

const UserModel = mongoose.model('User', userSchema);

module.exports  = UserModel;