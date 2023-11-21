const userModel = require("./user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY=process.env.SECRET_KEY;

const signup = async (req,res) => {
    //exisiting user check
    // hashed password
    // user creation
    // token generate
    const {username,email,password} = req.body;
    try{
        const exisitingUser = await userModel.findOne({ email:email})
        if(exisitingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            email:email,
            username:username,
            password:hashedPassword
        });

        const token = jwt.sign({
            email:result.email,
            id:result._id,     
        },
        SECRET_KEY
        );

        res.status(201).json({user:result,token:token,message:"User created successfully"});


    }catch(error){
        console.log(error);
        res.status(500),json({message:"Something went wrong"});
    }
}
const signin= async (req,res) => {

    const {email,password} = req.body;
    try{
        const exisitingUser = await userModel.findOne({ email:email})
        if(!exisitingUser){
            return res.status(400).json({message:"User does not exists"})
        }

        const matchPassword = await bcrypt.compare(password,exisitingUser.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid credentials"});
        }
       
        console.log("SECRET_KEY",SECRET_KEY);
        const token = jwt.sign({
            email:exisitingUser.email,
            id:exisitingUser._id,     
        },
        SECRET_KEY
        );

        res.status(201).json({user:exisitingUser,token:token,message:"User logged in successfully"});


    }catch(error){
        console.log(error);
        res.status(500),json({message:"Something went wrong"});
    }

}
module.exports = {signup,signin}