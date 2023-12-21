const userModel = require("./user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const sendResponse = require("../../utility/response");
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
            // return res.status(400).json({message:"User already exists"})
            return sendResponse(res, 'error', 400, 'User already exists', null);
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
        const data = {user:result,token:token}
        // res.status(201).json({message:"User created successfully"});

        res.cookie('jwtToken', token, { httpOnly: true });

        sendResponse(res, 'success', 202, 'User created successfully', data);
        


    }catch(error){
        console.log(error);
        // res.status(500),json({message:"Something went wrong"});
         sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }
}
const signin= async (req,res) => {

    const {email,password} = req.body;
    try{
        const exisitingUser = await userModel.findOne({ email:email})
        if(!exisitingUser){
            // return res.status(400).json({message:"User does not exists"})
           return sendResponse(res, 'error', 400, 'User does not exist', null);
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
        const data = {user:exisitingUser,token:token}
        // res.status(201).json({message:"User logged in successfully"});
        sendResponse(res, 'success', 201, 'User logged in successfully', data);
    }catch(error){
        console.log(error);
        sendResponse(res, 'error', 500, 'Something went wrong', null, error.message);
    }

}
module.exports = {signup,signin}