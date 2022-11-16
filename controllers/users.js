const UserModel = require('../model/users');


const registerUser = async(req, res, next ) =>{
     
    const { username, password } = req.body;
    try {

        if(!username || !password){
            return res.status(403).json({ success : false, msg : 'please provide all credentials'})
        }

        const user = await new UserModel({ 
            username,password,
        })

        const token = user.generateJWT();

        await user.save()
        res.status(201)
        .json({
            success : true,
            message : `You've successfully Signed Up`,
            username,
            token


        })

        
    } catch (error) {
        next(error)
    }
}


const loginUser = async(req, res, next)=>{
    const{ username, password} = req.body
    if(!username || !password){
        return res.status(403).json({ success : false, msg : 'please provide all credentials'})
    }
 try {
    const user = await UserModel.findOne({ username })
    if(!user){
        return res.status(401).json({ success : false, msg : 'This username does not exist, please sign up'})
    }
    
    //validate the password

    const validate = await user.validatePassword(password)
    if(!validate){
        return res.status(401).json({success: false, message: `Wrong password, please try again`})

    }
    const token = user.generateJWT();
    res.status(200).json({
        success : true,
        message : `You've successfully logged in`,
        username,
        token
    })
 } catch (error) {
    next(error)
 }

}


module.exports = {registerUser, loginUser }
